const openpgp = require('openpgp');

/**
 * Encrypts byte array using given password.
 * 
 * @param {TypedArray} binaryInput 
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
 * Decrypts ASCII-armored string using given password.
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

export default {
    encrypt,
    decrypt
}

