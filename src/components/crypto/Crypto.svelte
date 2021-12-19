<script>
    import crypto from "../../scripts/crypto.js";
    import Input from "./Input.svelte";
    import Output from "./Output.svelte";

    import LayoutGrid, { Cell } from "@smui/layout-grid";

    export let log;

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let inputData;
    let inputPassword;
    let inputFileName;

    let outputDisplayText;
    let outputDownloadConfig;

    async function handleEncrypt(event) {
        if (!inputData || !inputPassword) {
            return;
        }

        const doEncrypt = event.detail.doEncrypt;

        log(
            `Processing input with binary value "${inputData}", password "${inputPassword}", and doEncrypt "${doEncrypt}"`
        );

        try {
            let outputData;

            if (doEncrypt) {
                // Take binary input and encrypt it into ASCII-armored String
                const encryptedASCII = await crypto.encrypt(inputData, inputPassword);

                outputDisplayText = encryptedASCII;
                outputData = encoder.encode(encryptedASCII);

                log(`Encrypted ${inputData} into message ${encryptedASCII}`);
            } else {
                // Convert binary input into (previously encrypted) ASCII-armored String and decrypt it into binary
                const inputDataAsASCII = decoder.decode(inputData);
                const decryptedBinary = await crypto.decrypt(inputDataAsASCII, inputPassword);

                outputDisplayText = decoder.decode(decryptedBinary);
                outputData = decryptedBinary;

                log(`Decrypted message ${inputDataAsASCII} into ${decryptedBinary}`);
            }

            outputDownloadConfig = {
                inputFileName: inputFileName,
                doEncrypt: doEncrypt,
                outputData: outputData,
            };
        } catch (e) {
            outputDisplayText = e;
        }
    }

    function handleClear() {
        outputDisplayText = "";
        outputDownloadConfig = {
            outputData: "",
        };
    }
</script>

<div class="page-wrapper">
    <LayoutGrid>
        <Cell span={6}>
            <div class="input">
                <Input
                    bind:inputData
                    bind:fileName={inputFileName}
                    bind:password={inputPassword}
                    on:encrypt={handleEncrypt}
                    on:clear={handleClear}
                />
            </div>
        </Cell>
        <Cell span={6}>
            <div class="output">
                <Output {log} {inputFileName} {outputDisplayText} downloadConfig={outputDownloadConfig} />
            </div>
        </Cell>
    </LayoutGrid>
</div>

<style>
</style>
