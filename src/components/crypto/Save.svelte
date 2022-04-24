<script>
    import filesystem from "../../scripts/filesystem";
    import CircularProgress from "@smui/circular-progress";
    import Button, { Label, Icon as ButtonIcon } from "@smui/button";
    import { Title } from "@smui/paper";
    import crypto from "../../scripts/crypto.js";

    export let log;
    export let inputData;
    export let inputFileName;
    export let lock;
    export let password;

    const STATE_HIDDEN = "hidden";
    const STATE_LOADING = "loading";
    const STATE_DONE = "done";
    const STATE_ERROR = "error";

    const DOWNLOAD_FILE_MIME_TYPE = "application/octet-stream";

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let currentState = STATE_HIDDEN;
    let errorMessage = "";

    export function clear() {
        currentState = STATE_HIDDEN;
    }

    async function handleSave() {
        if (!inputData || !password) {
            // TODO error message?
            return;
        }

        currentState = STATE_LOADING;

        try {
            const outputData = await doEncrypt(inputData, password, lock);
            currentState = STATE_DONE;
            saveOutput(inputFileName, lock, outputData);
        } catch (e) {
            log(e);

            if (lock) {
                errorMessage = "There was a problem encrypting your data.";
            } else {
                errorMessage =
                    "There was a problem decrypting your data. Please check that you selected a previously-encrypted file.";
            }

            currentState = STATE_ERROR;
        }
    }

    async function doEncrypt(inputData, password, lock) {
        log(`Processing input with binary value "${inputData}", password "${password}", and doEncrypt "${lock}"`);

        let outputData;
        if (lock) {
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
    <Title>Save your new file</Title>

    <div>
        <Button color="secondary" variant="raised" on:click={handleSave} touch>
            <ButtonIcon class="material-icons">download</ButtonIcon>
            <Label>Save</Label>
        </Button>
    </div>
    {#if currentState === STATE_LOADING}
        <div style="display: flex; justify-content: center">
            <CircularProgress style="height: 32px; width: 32px;" indeterminate />
        </div>
    {:else if currentState === STATE_DONE}
        <ButtonIcon class="material-icons">done</ButtonIcon>
    {:else if currentState === STATE_ERROR}
        <ButtonIcon class="material-icons">error</ButtonIcon>
    {/if}
</div>
