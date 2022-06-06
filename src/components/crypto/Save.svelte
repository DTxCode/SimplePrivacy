<script>
    import filesystem from "../../scripts/filesystem";
    import crypto from "../../scripts/crypto.js";
    import { CONTEXT_LOG_KEY, CONTEXT_DECODER_KEY } from "../../scripts/constants";
    import CircularProgress from "@smui/circular-progress";
    import Button, { Label, Icon as ButtonIcon } from "@smui/button";
    import { Title, Subtitle, Content } from "@smui/paper";
    import { getContext } from "svelte";

    export let inputData;
    export let inputFileName;
    export let lock;
    export let password;

    const STATE_HIDDEN = "hidden";
    const STATE_LOADING = "loading";
    const STATE_DONE = "done";
    const STATE_ERROR = "error";
    const DOWNLOAD_FILE_MIME_TYPE = "application/octet-stream";

    const log = getContext(CONTEXT_LOG_KEY);
    const decoder = getContext(CONTEXT_DECODER_KEY);

    let currentState = STATE_HIDDEN;
    let errorMessage = "";

    export function clear() {
        currentState = STATE_HIDDEN;
        errorMessage = "";
    }

    async function handleSave() {
        if (!inputData || inputData.length === 0 || !password) {
            errorMessage = "Please select a file and enter a password";
            currentState = STATE_ERROR;
            return;
        }

        currentState = STATE_LOADING;
        errorMessage = "";

        try {
            const outputData = await doEncrypt(inputData, password, lock);
            currentState = STATE_DONE;
            saveOutput(inputFileName, lock, outputData);
        } catch (e) {
            log(e);

            if (lock) {
                errorMessage = "There was a problem locking your data.";
            } else {
                errorMessage =
                    "There was a problem unlocking your data. Please check that you selected an already locked file and entered the correct password.";
            }

            currentState = STATE_ERROR;
        }
    }

    async function doEncrypt(inputData, password, lock) {
        log(`Processing input with binary value "${inputData}", password "${password}", and doEncrypt "${lock}"`);

        let outputData;
        if (lock) {
            // Take binary input (not necessarily ASCII) and encrypt it into ASCII-armored String
            // that starts with "-----BEGIN PGP MESSAGE-----"
            outputData = await crypto.encrypt(inputData, password);

            log(`Encrypted ${inputData} into message ${outputData}`);
        } else {
            // Convert binary input into (previously encrypted) ASCII-armored String that starts with "-----BEGIN PGP MESSAGE-----"
            const inputDataAsASCII = decoder.decode(inputData);

            // Decrypt ASCII-armored String into binary bytes. The OS will interpret the bytes based on the file extension.
            outputData = await crypto.decrypt(inputDataAsASCII, password);

            log(`Decrypted message ${inputDataAsASCII} into ${outputData}`);
        }

        return outputData;
    }

    function saveOutput(inputFileName, lock, outputData) {
        let fileName;

        if (lock) {
            fileName = inputFileName + ".gpg";
        } else {
            fileName = inputFileName.endsWith(".gpg") ? inputFileName.slice(0, -4) : inputFileName;
        }

        log("Writing file with name " + fileName + " and data " + outputData);

        filesystem.writeFile(fileName, DOWNLOAD_FILE_MIME_TYPE, outputData);
    }
</script>

<div>
    <div>
        {#if lock}
            <Title>Save your locked file</Title>
            <!-- <Subtitle>Your file will have a <b>.gpg</b> extension indicating it is locked.</Subtitle> -->
        {:else}
            <Title>Save your unlocked file</Title>
            <!-- <Subtitle>The <b>.gpg</b> extension will be removed.</Subtitle> -->
        {/if}
    </div>

    <div class="save-container">
        <div class="save-child">
            <Button color="secondary" variant="raised" on:click={handleSave} touch>
                <ButtonIcon class="material-icons">download</ButtonIcon>
                <Label>Save</Label>
            </Button>
        </div>
        <div class="save-child">
            {#if currentState === STATE_LOADING}
                <CircularProgress style="height: 32px; width: 32px;" indeterminate />
            {:else if currentState === STATE_DONE}
                <ButtonIcon class="material-icons">done</ButtonIcon>
            {:else if currentState === STATE_ERROR}
                <div style="display: flex; gap: 10px;">
                    <div>
                        <ButtonIcon class="material-icons">warning</ButtonIcon>
                    </div>
                    <div>
                        <Content>{errorMessage}</Content>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .save-container {
        display: flex;
        align-items: center;
        gap: 20px;
    }
</style>
