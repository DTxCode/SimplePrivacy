<script>
    import filesystem from "../../scripts/filesystem";
    import clipboard from "../../scripts/clipboard";

    export let log;
    export let inputFileName;
    export let outputData;
    export let outputDisplayText;

    const DOWNLOAD_FILE_MIME_TYPE = "application/octet-stream";
    const DEFAULT_DECRYPTED_FILE_NAME = "decrypted.txt";
    const DEFAULT_ENCRYPTED_FILE_NAME = "encrypted.txt.gpg";

    async function saveToClipboard() {
        await clipboard.save(outputDisplayText);
    }

    function downloadOutput() {
        let fileName;
        if (doEncrypt) {
            fileName = inputFileName ? inputFileName + ".gpg" : DEFAULT_ENCRYPTED_FILE_NAME;
        } else {
            if (inputFileName) {
                fileName = inputFileName.endsWith(".gpg") ? inputFileName.slice(0, -4) : inputFileName;
            } else {
                fileName = DEFAULT_DECRYPTED_FILE_NAME;
            }
        }

        log("Writing file with name " + fileName + " and data " + outputData);

        filesystem.writeFile(fileName, DOWNLOAD_FILE_MIME_TYPE, outputData);
    }
</script>

<h2>Output</h2>
<button on:click={saveToClipboard}> Copy </button>
<button on:click={downloadOutput}> Download </button>
<br />
<textarea disabled value={outputDisplayText} />

<style>
    textarea {
        width: 100%;
        height: 100%;
    }
</style>
