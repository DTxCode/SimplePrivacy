import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/svelte'
import { CONTEXT_LOG_KEY, CONTEXT_DECODER_KEY } from '../../src/scripts/constants';
import userEvent from '@testing-library/user-event'
import textEncoding from 'text-encoding-utf-8';
import util from '../util'
import Crypto from '../../src/components/Crypto.svelte'
import ComponentTestWrapper from './ComponentTestWrapper.svelte'
const fs = require('fs');
const path = require('path');

const PGP_MESSAGE_REGEX = /^-----BEGIN PGP MESSAGE-----(.*)-----END PGP MESSAGE-----\n$/s;
// Includes header, new lines, and footer
const PGP_MESSAGE_MIN_LENGTH = 56;

const FILE_SELECT_BUTTON_ID = 'file-selector';
const PASSWORD_BOX_ID = 'password';
const SAVE_BUTTON_ID = 'save';
const ERROR_MESSAGE_ID = 'error-message';
const LOCK_TAB_ID = 'lock-tab';
const UNLOCK_TAB_ID = 'unlock-tab';

const EXPECTED_MISSING_INPUT_MESSAGE = 'Please select a file and enter a password';
const EXPECTED_WRONG_PASSWORD_MESSAGE = 'There was a problem unlocking your data. ' +
    'Please check that you selected an already locked file and entered the correct password.';

const LARGE_FILE_PATH = path.resolve(__dirname, '../data/large_pic.jpg');

const MAX_LOG_LINE = 500;

// Map of test name -> blob
const testBlobs = new Map();

let textEncoder;
let textDecoder;
let user;

beforeAll(() => {
    // TextEncoder implementation provided by 'text-encoding-utf-8' library
    global.TextEncoder = textEncoding.TextEncoder;
    global.TextDecoder = textEncoding.TextDecoder;
    textEncoder = new TextEncoder();
    textDecoder = new TextDecoder();

    setUpObjectUrlSpy();
    global.window.URL.revokeObjectURL = jest.fn();
});

beforeEach(() => {
    user = userEvent.setup()
    render(ComponentTestWrapper, {
        props: {
            component: Crypto,
            contextPairs: [
                { contextKey: CONTEXT_LOG_KEY, contextValue: util.getTruncatedLogger(MAX_LOG_LINE) },
                { contextKey: CONTEXT_DECODER_KEY, contextValue: textDecoder }
            ]
        }
    })
})

describe('encryption', () => {
    test('encrypts message successfully', async () => {
        const inputData = 'my message';
        const password = 'pwd';

        const output = await doMainWorkflow('test.txt', textEncoder.encode(inputData), password);

        expect(output).toMatch(PGP_MESSAGE_REGEX)
        expect(output.length).toBeGreaterThan(PGP_MESSAGE_MIN_LENGTH)
    })

    test('makes different outputs from the same message (same passwords)', async () => {
        const inputData = 'my message';
        const password = 'pwd';

        const output1 = await doMainWorkflow('test.txt', textEncoder.encode(inputData), password);
        expect(output1).toMatch(PGP_MESSAGE_REGEX)
        expect(output1.length).toBeGreaterThan(PGP_MESSAGE_MIN_LENGTH)

        const output2 = await doMainWorkflow(null, null, password);
        expect(output2).toMatch(PGP_MESSAGE_REGEX)
        expect(output2.length).toBeGreaterThan(PGP_MESSAGE_MIN_LENGTH)

        expect(output1).not.toEqual(output2)
    })

    test('makes different outputs from the same message (different passwords)', async () => {
        const inputData = 'my message';
        const password1 = 'pwd';
        const password2 = 'otherPwd';

        const output1 = await doMainWorkflow('test.txt', textEncoder.encode(inputData), password1);
        expect(output1).toMatch(PGP_MESSAGE_REGEX)
        expect(output1.length).toBeGreaterThan(PGP_MESSAGE_MIN_LENGTH)

        const output2 = await doMainWorkflow(null, null, password2);
        expect(output2).toMatch(PGP_MESSAGE_REGEX)
        expect(output2.length).toBeGreaterThan(PGP_MESSAGE_MIN_LENGTH)

        expect(output1).not.toEqual(output2)
    })

    test('doesnt encrypt if file has not been uploaded', async () => {
        const password = 'pwd';

        // Don't upload file...
        await doMainWorkflow(null, null, password);

        const errorMessage = screen.getByTestId(ERROR_MESSAGE_ID);
        expect(errorMessage.textContent).toEqual(EXPECTED_MISSING_INPUT_MESSAGE);
    })

    test('doesnt encrypt if password field is empty', async () => {
        const inputData = 'my message';

        // Don't type in password...
        await doMainWorkflow('test.txt', textEncoder.encode(inputData), null);

        const errorMessage = screen.getByTestId(ERROR_MESSAGE_ID);
        expect(errorMessage.textContent).toEqual(EXPECTED_MISSING_INPUT_MESSAGE);
    })

    // Note: This isn't trying to actually test encryption speed. It's just serving as a regression
    // test against a previous bug where large files would cause the component to hang.
    test('encrypts large file in reasonable amount of time', async () => {
        const inputData = fs.readFileSync(LARGE_FILE_PATH)
        const password = 'pwd';

        const output = await doMainWorkflow('test.jpg', inputData, password);

        expect(output).toMatch(PGP_MESSAGE_REGEX)
        expect(output.length).toBeGreaterThan(PGP_MESSAGE_MIN_LENGTH)

        // Specify max test runtime of 5 seconds below
    }, 5000)
})

describe('decryption', () => {
    beforeEach(async () => {
        const unlockTab = screen.getByTestId(UNLOCK_TAB_ID);
        await user.click(unlockTab);
    })

    test('decrypts message successfully', async () => {
        const encryptedMessage = `-----BEGIN PGP MESSAGE-----\n
        \n
        wy4ECQMI7ooC3if7GyPgZVUtFshIbkaIHhUP0UKpy7TsY8JXnYFLb3UfRWKn\n
        HppD0jQBoS/ye6KWCX9Q4n0CwgrYcz4wS0+7YH1IjB3KVFv0g5VTqViblchV\n
        9V7IXzkWfkpm3lEU\n
        =GNMs\n-----END PGP MESSAGE-----`;
        const password = "pwd";
        const expectedMessage = "abc";

        const output = await doMainWorkflow('test.txt', textEncoder.encode(encryptedMessage), password);

        expect(output).toEqual(expectedMessage)
    })

    test('shows error if password is incorrect', async () => {
        const encryptedMessage = `-----BEGIN PGP MESSAGE-----\n
        \n
        wy4ECQMI7ooC3if7GyPgZVUtFshIbkaIHhUP0UKpy7TsY8JXnYFLb3UfRWKn\n
        HppD0jQBoS/ye6KWCX9Q4n0CwgrYcz4wS0+7YH1IjB3KVFv0g5VTqViblchV\n
        9V7IXzkWfkpm3lEU\n
        =GNMs\n-----END PGP MESSAGE-----`;
        const password = "wrong password";

        await doMainWorkflow('test.txt', textEncoder.encode(encryptedMessage), password);

        const errorMessage = screen.getByTestId(ERROR_MESSAGE_ID);
        expect(errorMessage.textContent).toEqual(EXPECTED_WRONG_PASSWORD_MESSAGE)
    })

    test('doesnt decrypt if file has not been uploaded', async () => {
        const password = "wrong password";

        // Don't upload file...
        await doMainWorkflow(null, null, password);

        const errorMessage = screen.getByTestId(ERROR_MESSAGE_ID);
        expect(errorMessage.textContent).toEqual(EXPECTED_MISSING_INPUT_MESSAGE);
    })

    test('doesnt decrypt if password field is empty', async () => {
        const encryptedMessage = `-----BEGIN PGP MESSAGE-----\n
        \n
        wy4ECQMI7ooC3if7GyPgZVUtFshIbkaIHhUP0UKpy7TsY8JXnYFLb3UfRWKn\n
        HppD0jQBoS/ye6KWCX9Q4n0CwgrYcz4wS0+7YH1IjB3KVFv0g5VTqViblchV\n
        9V7IXzkWfkpm3lEU\n
        =GNMs\n-----END PGP MESSAGE-----`;

        // Don't type in password...
        await doMainWorkflow('test.txt', textEncoder.encode(encryptedMessage), null);

        const errorMessage = screen.getByTestId(ERROR_MESSAGE_ID);
        expect(errorMessage.textContent).toEqual(EXPECTED_MISSING_INPUT_MESSAGE);
    })

    test('can decrypt previously-encrypted SimplePrivacy message (round-trip)', async () => {
        const inputData = 'my message';
        const password = 'pwd';

        // Encrypt
        const lockTab = screen.getByTestId(LOCK_TAB_ID);
        await user.click(lockTab);

        const encryptionOutput = await doMainWorkflow('test.txt', textEncoder.encode(inputData), password);
        expect(encryptionOutput).toMatch(PGP_MESSAGE_REGEX)
        expect(encryptionOutput.length).toBeGreaterThan(PGP_MESSAGE_MIN_LENGTH)

        // Decrypt
        const unlockTab = screen.getByTestId(UNLOCK_TAB_ID);
        await user.click(unlockTab);

        const decryptionOutput = await doMainWorkflow('test.txt.gpg', textEncoder.encode(encryptionOutput), password);
        expect(decryptionOutput).toEqual(inputData);
    })

    // TODO investigate
    test.skip('can decrypt previously-encrypted generic PGP message', async () => {
        const encryptedMessage = `-----BEGIN PGP MESSAGE-----\n
        \n
        jA0ECQMCAEOqtMQRrYT/0kEBK3Utm80ZQ2X0QFlKkzkKsCFnCcjd4esePG4v17wo\n
        jTfhBRmnc4EprvFdSmEdbRujIFWyJzXHAclnWnJ5ZnTChg==\n
        =XIQY\n-----END PGP MESSAGE-----`;
        const password = "pwd";
        const expectedMessage = "abc";

        const output = await doMainWorkflow('test.txt', textEncoder.encode(encryptedMessage), password);

        expect(output).toEqual(expectedMessage)
    })
})

function setUpObjectUrlSpy() {
    // global.window.URL.createObjectURL implementation in JSDOM is provided by 'jsdom-worker' library
    const createObjectUrlImpl = global.window.URL.createObjectURL;

    // Stub createObjectURL to first save reference to blob and then call real implementation
    global.window.URL.createObjectURL = (blob) => {
        testBlobs.set(expect.getState().currentTestName, blob)
        return createObjectUrlImpl(blob);
    }
}

function getSpiedBlob() {
    return testBlobs.get(expect.getState().currentTestName)
}

/**
 * Simulates user performaining main workflow (selecting a file, entering a password, and hitting "save")
 * 
 * @param {str} fileName 
 * @param {ArrayBuffer} fileContents 
 * @param {str} password 
 * @return data that would have been saved to disk upon hitting "save" button
 */
async function doMainWorkflow(fileName, fileContents, password) {
    if (fileContents) {
        const fileSelector = screen.getByTestId(FILE_SELECT_BUTTON_ID);
        const testFile = util.createTestFile(fileName, fileContents);
        await user.upload(fileSelector, testFile);
    }

    if (password) {
        const passwordInput = screen.getByTestId(PASSWORD_BOX_ID);
        await user.clear(passwordInput.querySelector('input'));
        await user.type(passwordInput, password);
    }

    if (fileContents || password) {
        const saveButton = screen.getByTestId(SAVE_BUTTON_ID);
        await user.click(saveButton);
    }

    const savedBlob = getSpiedBlob();

    if (savedBlob) {
        return await savedBlob.text();
    } else {
        return null;
    }
}