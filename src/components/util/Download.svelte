<script>
    import filesystem from "../../scripts/filesystem";
    import CircularProgress from "@smui/circular-progress";
    import Button, { Label, Icon as ButtonIcon } from "@smui/button";

    export const STATE_HIDDEN = "hidden";
    export const STATE_LOADING = "loading";
    export const STATE_DONE = "done";

    const states = [STATE_HIDDEN, STATE_LOADING, STATE_DONE];
    const DOWNLOAD_FILE_MIME_TYPE = "application/octet-stream";
    const DEFAULT_DECRYPTED_FILE_NAME = "decrypted.txt";
    const DEFAULT_ENCRYPTED_FILE_NAME = "encrypted.txt.gpg";

    export let downloadConfig;
    export let log;

    let currentState = STATE_HIDDEN;

    export function setState(newState) {
        if (!states.includes(newState)) {
            throw "Invalid Download State";
        }

        currentState = newState;
    }

    export function clear() {
        currentState = STATE_HIDDEN;
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
    {#if currentState === STATE_LOADING}
        <div style="display: flex; justify-content: center">
            <CircularProgress style="height: 32px; width: 32px;" indeterminate />
        </div>
    {:else if currentState === STATE_DONE}
        <div>
            <Button color="secondary" variant="outlined" on:click={downloadOutput} touch>
                <ButtonIcon class="material-icons">download</ButtonIcon>
                <Label>Download</Label>
            </Button>
        </div>
    {/if}
</div>
