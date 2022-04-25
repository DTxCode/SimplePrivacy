import crypto from '../crypto';
import textEncoding from 'text-encoding-utf-8';

let decoder;
let encoder;

beforeAll(() => {
    global.TextEncoder = textEncoding.TextEncoder;
    global.TextDecoder = textEncoding.TextDecoder;
    decoder = new TextDecoder();
    encoder = new TextEncoder();
});

test('encrypts bytes using password into a real PGP message', async () => {
    const data = [99, 100];
    const password = "pwd";

    const encryptedData = await crypto.encrypt(data, password);

    expect(encryptedData.substring(0, 27)).toEqual("-----BEGIN PGP MESSAGE-----");
    expect(encryptedData.substring(27, 174).includes("-")).toEqual(false);
    expect(encryptedData.substring(174)).toEqual("-----END PGP MESSAGE-----\n");
});

test('encrypts bytes using empty password into a real PGP message', async () => {
    const data = [99, 100];
    const password = "";

    const encryptedData = await crypto.encrypt(data, password);

    expect(encryptedData.substring(0, 27)).toEqual("-----BEGIN PGP MESSAGE-----");
    expect(encryptedData.substring(27, 174).includes("-")).toEqual(false);
    expect(encryptedData.substring(174)).toEqual("-----END PGP MESSAGE-----\n");
});

test('encrypts empty bytes using password into a real PGP message', async () => {
    const data = [];
    const password = "pwd";

    const encryptedData = await crypto.encrypt(data, password);

    expect(encryptedData.substring(0, 27)).toEqual("-----BEGIN PGP MESSAGE-----");
    expect(encryptedData.substring(27, 170).includes("-")).toEqual(false);
    expect(encryptedData.substring(170)).toEqual("-----END PGP MESSAGE-----\n");
});


test('isEncrypted correctly detects encrypted data', async () => {
    const encryptedMessage = `-----BEGIN PGP MESSAGE-----

    wy4ECQMIkquhOyyR0Nzgd9GGN99mk/1F95z7CkCj97bXA9Tk17rxvs1C3Sj3
    vtkG0v8AGpcmAa5XYJQSZ/UO0zGlV/EdbdzMb6IQyVF5rRwaeMIPu13hM3js
    S+CcwLFgg1LmWiBPUzP1Fpk+7omhZW5HcrCgC5bQ1zJbPSyc0K30uUdHVvdR
    faKVLomF5gG0y1lu5SQ=
    =PwwD
    -----END PGP MESSAGE-----
    `;
    const data = encoder.encode(encryptedMessage);

    const isEncrypted = crypto.isEncrypted(data, decoder);

    expect(isEncrypted).toBeTruthy();
});

test('isEncrypted correctly detects unencrypted data', async () => {
    const randomMessage = `-----BEGIN RANDOM OTHER MESSAGE-----`;
    const data = encoder.encode(randomMessage);

    const isEncrypted = crypto.isEncrypted(data, decoder);

    expect(isEncrypted).toBeFalsy();
});

test('isEncrypted correctly detects empty data', async () => {
    const emptyMessage = "";
    const data = encoder.encode(emptyMessage);

    const isEncrypted = crypto.isEncrypted(data, decoder);

    expect(isEncrypted).toBeFalsy();
});

test('decryptes encrypted message into original bytes', async () => {
    const encryptedMessage = `-----BEGIN PGP MESSAGE-----\n
    \n
    wy4ECQMI7ooC3if7GyPgZVUtFshIbkaIHhUP0UKpy7TsY8JXnYFLb3UfRWKn\n
    HppD0jQBoS/ye6KWCX9Q4n0CwgrYcz4wS0+7YH1IjB3KVFv0g5VTqViblchV\n
    9V7IXzkWfkpm3lEU\n
    =GNMs\n-----END PGP MESSAGE-----`;
    const password = "pwd";
    const expectedMessage = "abc";

    const originalBytes = await crypto.decrypt(encryptedMessage, password);
    expect(decoder.decode(originalBytes)).toEqual(expectedMessage);
});

test('rejects if decryption password is incorrect', async () => {
    const encryptedMessage = `-----BEGIN PGP MESSAGE-----\n
    \n
    wy4ECQMI7ooC3if7GyPgZVUtFshIbkaIHhUP0UKpy7TsY8JXnYFLb3UfRWKn\n
    HppD0jQBoS/ye6KWCX9Q4n0CwgrYcz4wS0+7YH1IjB3KVFv0g5VTqViblchV\n
    9V7IXzkWfkpm3lEU\n
    =GNMs\n-----END PGP MESSAGE-----`;
    const password = "notMyPassword";

    await expect(crypto.decrypt(encryptedMessage, password)).rejects.toThrow();
});

test('rejects if message to decrypt is not a valid PGP message', async () => {
    const encryptedMessage = "NotAPGPMessage";
    const password = "pwd";

    await expect(crypto.decrypt(encryptedMessage, password)).rejects.toThrow();
});