const openpgp = require('openpgp');

async function encrypt(binaryInput, password) {

    const message = await openpgp.createMessage({
        'binary': Uint8Array.from(binaryInput)
    })
    
    const encrypted = await openpgp.encrypt({
        message,
        passwords: [password],
        format: 'armored'
    });

    return encrypted;
}

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

