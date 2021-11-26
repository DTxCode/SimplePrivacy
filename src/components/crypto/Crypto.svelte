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

<div class="page-wrapper">
    <div class="content-wrapper">
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
</div>

<style>
    .page-wrapper {
        padding-top: 2%;
        padding-bottom: 2%;
    }

    .content-wrapper {
        background-color: white;
        border: 1px solid rgb(200, 200, 200);
        /* Grid layout */
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: max-content;
        padding: 25px;
        padding-top: 10px;
        /* Position in div */
        margin: 0 auto;
        width: 90%;
    }

    .options {
        grid-column: 1;
        grid-row: 1;
    }

    .input {
        grid-column: 1;
        grid-row: 2 / 6;
    }

    .output {
        grid-column: 2;
        grid-row: 1 / 6;
    }
</style>
