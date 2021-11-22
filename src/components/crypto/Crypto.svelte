<script>
    import crypto from "../../scripts/crypto.js";
    import Options from "./Options.svelte";
    import Input from "./Input.svelte";
    import Output from "./Output.svelte";

    export let log;

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let doEncrypt = true; // From options

    let inputData; // From input
    let password; // From input
    let fileName; // From input

    let outputData; // For output
    let outputDisplayText; // For output

    $: (async () => {
        log("asyncing");
        if (!inputData || !password) {
            outputDisplayText = "";
            return;
        }

        log(`Processing input with binary value ${inputData}`);

        try {
            if (doEncrypt) {
                // Take binary input and encrypt it into ASCII-armored String
                const encryptedASCII = await crypto.encrypt(inputData, password);

                outputData = encoder.encode(encryptedASCII);
                outputDisplayText = encryptedASCII;

                log(`Encrypted ${inputData} into message ${encryptedASCII}`);
            } else {
                // Convert binary input into (previously encrypted) ASCII-armored String and decrypt it into binary
                const inputDataAsASCII = decoder.decode(inputData);
                const decryptedBinary = await crypto.decrypt(inputDataAsASCII, password);

                outputData = decryptedBinary;
                outputDisplayText = decoder.decode(decryptedBinary);

                log(`Decrypted message ${inputDataAsASCII} into ${decryptedBinary}`);
            }
        } catch (e) {
            outputDisplayText = e;
        }
    })();
</script>

<div class="wrapper">
    <div class="options">
        <Options bind:doEncrypt />
    </div>
    <div class="input">
        <Input bind:inputData bind:fileName bind:password />
    </div>
    <div class="output">
        <Output {log} inputFileName={fileName} {outputData} {outputDisplayText} />
    </div>
</div>

<style>
    .wrapper {
        /* Grid layout */
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        grid-template-rows: repeat(6, minmax(0, 1fr));
        gap: 20px;
        /* Position on page */
        margin: 0 auto;
        width: 90%;
    }

    .options {
        grid-column: 1 / 6;
        grid-row: 1;
    }

    .input {
        grid-column: 1 / 6;
        grid-row: 2 / 6;
    }

    .output {
        grid-column: 7 / 12;
        grid-row: 1 / 6;
    }
</style>
