<script>
    import filesystem from "../../scripts/filesystem";
    import clipboard from "../../scripts/clipboard";
    import Textfield from "@smui/textfield";
    import Button, { Label, Icon } from "@smui/button";
    import { Title, Subtitle, Content } from "@smui/paper";
    import CircularProgress from "@smui/circular-progress";

    export let log;
    export let isLoading;
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
    <div class="output-banner">
        <div class="output-title">
            <Title>Output</Title>
        </div>
        <div class="output-buttons">
            <Button color="secondary" on:click={saveToClipboard} touch>
                <Icon class="material-icons">content_copy</Icon>
                <Label>Copy</Label>
            </Button>

            <Button color="secondary" on:click={downloadOutput} touch>
                <Icon class="material-icons">download</Icon>
                <Label>Download</Label>
            </Button>
        </div>
    </div>

    {#if isLoading}
        <div style="display: flex; justify-content: center">
            <CircularProgress style="height: 32px; width: 32px;" indeterminate />
        </div>
    {:else}
        <div>
            <Textfield
                textarea
                disabled
                variant="filled"
                style="width: 100%; height:200px;"
                bind:value={outputDisplayText}
            />
        </div>
    {/if}
</div>

<style>
    .output-banner {
        margin: 10px 0px 10px 10px;
    }

    .output-title {
        display: inline-block;
    }

    .output-buttons {
        float: right;
    }
</style>
