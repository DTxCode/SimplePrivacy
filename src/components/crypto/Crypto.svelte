<script>
    import crypto from "../../scripts/crypto.js";
    import Input from "./Input.svelte";
    import Output from "./Output.svelte";

    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import Dialog, { Title, Content } from "@smui/dialog";
    import Paper, { Content as PaperContent } from "@smui/paper";

    export let log;

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let inputData;
    let inputPassword;
    let inputFileName;

    let isLoading = false;
    let showError = false;
    let errorMessage = "";

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
            isLoading = true;

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
            log(e);
            outputDisplayText = "";
            outputDownloadConfig = {
                outputData: "",
            };
            showError = true;

            if (doEncrypt) {
                errorMessage = "There was a problem encrypting your message.";
            } else {
                errorMessage =
                    "There was a problem decrypting your message. Please check that you entered a valid encrypted message into the input box.";
            }
        }

        isLoading = false;
    }

    function handleClear() {
        outputDisplayText = "";
        outputDownloadConfig = {
            outputData: "",
        };
    }
</script>

<div class="crypto-wrapper">
    <div class="paper-wrapper">
        <Paper>
            <PaperContent>
                <LayoutGrid style="padding: 0px;">
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
                            <Output
                                {log}
                                {inputFileName}
                                {outputDisplayText}
                                downloadConfig={outputDownloadConfig}
                                {isLoading}
                            />
                        </div>
                    </Cell>
                </LayoutGrid>

                <Dialog bind:open={showError} aria-labelledby="error-title" aria-describedby="error-content">
                    <Title id="error-title">Error</Title>
                    <Content id="error-content">{errorMessage}</Content>
                </Dialog>
            </PaperContent>
        </Paper>
    </div>
</div>

<style>
    .crypto-wrapper {
        width: 100vw;
        float: left;
        margin: 0px;
    }

    .paper-wrapper {
        margin: 20px auto;
        width: 85%;
    }
</style>
