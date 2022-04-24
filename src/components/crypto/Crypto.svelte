<script>
    import crypto from "../../scripts/crypto.js";
    import Input from "./Input.svelte";
    import Password from "./Password.svelte";
    import Output from "./Output.svelte";
    import Download from "../util/Download.svelte";

    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import Dialog, { Title, Content } from "@smui/dialog";
    import Paper, { Content as PaperContent } from "@smui/paper";

    export let log;

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let showError = false;
    let errorMessage = "";

    let inputComponent;
    let passwordComponent;
    let downloadComponent;

    let inputData;
    let inputFileName;
    let password;

    let downloadConfig;

    async function handleEncrypt(event) {
        if (!inputData || !password) {
            return;
        }

        const doEncrypt = event.detail.doEncrypt;

        log(`Processing input with binary value "${inputData}", password "${password}", and doEncrypt "${doEncrypt}"`);
        downloadComponent.setState(downloadComponent.STATE_LOADING);

        let outputData;
        try {
            if (doEncrypt) {
                // Take binary input and encrypt it into ASCII-armored String
                const encryptedASCII = await crypto.encrypt(inputData, password);

                outputData = encoder.encode(encryptedASCII);

                log(`Encrypted ${inputData} into message ${encryptedASCII}`);
            } else {
                // Convert binary input into (previously encrypted) ASCII-armored String and decrypt it into binary
                const inputDataAsASCII = decoder.decode(inputData);
                const decryptedBinary = await crypto.decrypt(inputDataAsASCII, password);

                outputData = decryptedBinary;

                log(`Decrypted message ${inputDataAsASCII} into ${decryptedBinary}`);
            }
        } catch (e) {
            log(e);

            if (doEncrypt) {
                errorMessage = "There was a problem encrypting your data.";
            } else {
                errorMessage =
                    "There was a problem decrypting your data. Please check that you selected a previously-encrypted file.";
            }

            showError = true;
        }

        downloadConfig = {
            inputFileName: inputFileName,
            doEncrypt: doEncrypt,
            outputData: outputData,
        };
        downloadComponent.setState(downloadComponent.STATE_DONE);
    }

    function handleClear() {
        inputComponent.clear();
        passwordComponent.clear();
        downloadComponent.clear();
    }
</script>

<div class="crypto-wrapper">
    <div class="paper-wrapper">
        <Paper>
            <PaperContent>
                <LayoutGrid style="padding: 0px 25px;">
                    <Cell span={1}>
                        <h2>1</h2>
                    </Cell>
                    <Cell span={11}>
                        <div class="input">
                            <Input
                                bind:this={inputComponent}
                                bind:data={inputData}
                                bind:fileName={inputFileName}
                                on:clear={handleClear}
                            />
                        </div>
                    </Cell>
                    <Cell span={1}>
                        <h2>2</h2>
                    </Cell>
                    <Cell span={11}>
                        <Password bind:this={passwordComponent} bind:password />
                    </Cell>
                    <Cell span={1}>
                        <h2>3</h2>
                    </Cell>
                    <Cell span={11}>
                        <div class="output">
                            <Output on:encrypt={handleEncrypt} />
                        </div>
                    </Cell>
                </LayoutGrid>

                <Download bind:this={downloadComponent} bind:log bind:downloadConfig />

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
        width: 100%;
        margin: 0px;
    }

    .paper-wrapper {
        margin: 20px auto;
        width: 70%;
    }
</style>
