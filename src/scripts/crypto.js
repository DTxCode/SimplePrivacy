const openpgp = require('openpgp');

/**
 * 
 * Encrypts binary array input using given password.
 * 
 * @param {TypedArray} binaryInput 
 * @param {string} password 
 * @returns String with encrypted version of array input.
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
 * 
 * Decrypts encrypted string using given password.
 * 
 * @param {string} encryptedMessage 
 * @param {string} password 
 * @returns Uint8Array with decrypted bytes.
 */
async function decrypt(encryptedMessage, password) { 
    const message = await openpgp.readMessage({
        armoredMessage: encryptedMessage
    });

    const { data: decrpyted } = await openpgp.decrypt({
        message: message,
        passwords: [password],
        format: 'binary'
    })

    return decrpyted;
}

export default {
    encrypt,
    decrypt
}

