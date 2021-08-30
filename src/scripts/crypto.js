const openpgp = require('openpgp');

// TODO: upgrade to OpenPGP v5

async function encrypt(input, password) {
    const message = await openpgp.message.fromText(input);
    
    const { data: encrypted } = await openpgp.encrypt({
        message,
        passwords: [password]
    });

    return encrypted;
}

async function decrypt(encryptedMessage, password) { 
    const message = await openpgp.message.readArmored(encryptedMessage);

    const { data: decrpyted } = await openpgp.decrypt({
        message: message,
        passwords: [password]
    })

    return decrpyted;
}

export default {
    encrypt,
    decrypt
}

