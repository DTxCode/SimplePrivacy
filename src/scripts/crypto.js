const openpgp = require('openpgp');

const PGP_MESSAGE_START_INDEX = 27;
const PGP_MESSAGE_START = "-----BEGIN PGP MESSAGE-----";

/**
 * Encrypts given input using given password.
 * 
 * @param {ArrayBuffer} binaryInput 
 * @param {string} password 
 * @returns ASCII-armored encrypted string
 */
async function encrypt(binaryInput, password) {
    const message = await openpgp.createMessage({
        'binary': new Uint8Array(binaryInput)
    })

    const encrypted = await openpgp.encrypt({
        message,
        passwords: [password],
        format: 'armored'
    });

    return encrypted;
}

/**
 * Decrypts given input using given password.
 * 
 * @param {string} encryptedMessage 
 * @param {string} password 
 * @returns Uint8Array with decrypted bytes.
 */
async function decrypt(encryptedMessage, password) {
    const message = await openpgp.readMessage({
        armoredMessage: encryptedMessage
    });

    const { data: decrypted } = await openpgp.decrypt({
        message: message,
        passwords: [password],
        format: 'binary'
    })

    return decrypted;
}

/**
 * Whether the given data is (probably) an encrypted PGP message
 * @param {ArrayBuffer} data
 * @param {TextDecoder} decoder
 * @return bool for whether the given data is an encrpyted message
 */
function isEncrypted(data, decoder) {
    const binaryMessageStart = data.slice(0, PGP_MESSAGE_START_INDEX);
    const messageStart = decoder.decode(binaryMessageStart);

    return messageStart === PGP_MESSAGE_START;
}

export default {
    encrypt,
    decrypt,
    isEncrypted
}

