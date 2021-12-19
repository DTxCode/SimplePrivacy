<script>
    import filesystem from "../../scripts/filesystem";
    import clipboard from "../../scripts/clipboard";
    import Textfield from "@smui/textfield";
    import Button, { Label, Icon } from "@smui/button";

    export let log;
    export let outputDisplayText = "";
    export let downloadConfig = {}; // inputFileName, doEncrypt, outputData

    const DOWNLOAD_FILE_MIME_TYPE = "application/octet-stream";
    const DEFAULT_DECRYPTED_FILE_NAME = "decrypted.txt";
    const DEFAULT_ENCRYPTED_FILE_NAME = "encrypted.txt.gpg";

    async function saveToClipboard() {
        await clipboard.save(outputDisplayText);
    }

    function downloadOutput() {
        if (!downloadConfig.outputData) {
            return;
        }

        let fileName;
        if (downloadConfig.doEncrypt) {
            fileName = downloadConfig.inputFileName
                ? downloadConfig.inputFileName + ".gpg"
                : DEFAULT_ENCRYPTED_FILE_NAME;
        } else {
            if (downloadConfig.inputFileName) {
                fileName = downloadConfig.inputFileName.endsWith(".gpg")
                    ? downloadConfig.inputFileName.slice(0, -4)
                    : downloadConfig.inputFileName;
            } else {
                fileName = DEFAULT_DECRYPTED_FILE_NAME;
            }
        }

        log("Writing file with name " + fileName + " and data " + downloadConfig.outputData);

        filesystem.writeFile(fileName, DOWNLOAD_FILE_MIME_TYPE, downloadConfig.outputData);
    }
</script>

<div>
    <h2>Output</h2>

    <Button variant="outlined" on:click={saveToClipboard}>
        <Icon class="material-icons">content_copy</Icon>
        <Label>Copy</Label>
    </Button>

    <Button variant="outlined" on:click={downloadOutput}>
        <Icon class="material-icons">download</Icon>
        <Label>Download</Label>
    </Button>

    <Textfield textarea disabled style="width: 100%; height:200px;" bind:value={outputDisplayText} />
</div>

<style>
</style>
