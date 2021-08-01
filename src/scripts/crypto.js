const openpgp = require('openpgp');


// TODO: upgrade to OpenPGP v5 and fix functions

async function encrypt(input, password) {
    const message = await openpgp.message.fromText(input);
    
    const { data: encrypted } = await openpgp.encrypt({
        message,
        passwords: [password]
    });

    console.log(encrypted);

    return encrypted;
}

async function decrypt(encryptedMessage, password) { 
    const message = openpgp.readMessage({
        armoredMessage: encryptedMessage
    })

    return openpgp.decrypt({
        message: message,
        passwords: [password]
    })
}

function test(string, password) {
    return string + "a";
}

export default {
    encrypt,
    decrypt,
    test
}

// async function main() {
//     const encryptedData = await encrypt("hello there", "pwd");
//     console.log(encryptedData);

//     const decryptedData = await decrypt(encryptedData, "pwd");
//     console.log(decryptedData);
// }


