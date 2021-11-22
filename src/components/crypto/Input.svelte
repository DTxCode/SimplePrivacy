<script>
    import filesystem from "../../scripts/filesystem";
    import clipboard from "../../scripts/clipboard";

    const encoder = new TextEncoder();

    export let inputData;
    export let fileName;
    export let password;

    let fileInputReference;
    let inputDisplayText;

    async function readClipboard() {
        const clipboardContents = await clipboard.read();

        inputData = encoder.encode(clipboardContents);
        inputDisplayText = clipboardContents;
    }

    async function readFileInput(event) {
        const fileList = event.target.files;
        const file = fileList[0];

        fileName = file["name"];
        inputData = await filesystem.readFile(file);
        inputDisplayText = "File uploaded!";
    }

    function readTextInput(event) {
        inputData = encoder.encode(inputDisplayText);
        // inputDisplayText manipulated by Svelte
    }

    function clear() {
        inputData = [];
        fileName = "";
        inputDisplayText = "";
        password = "";
        fileInputReference.value = "";
    }
</script>

<h2>Input</h2>
<button on:click={readClipboard}> Paste </button>
<input type="file" bind:this={fileInputReference} on:change={readFileInput} />
<br />
<button on:click={clear}> Clear </button>

<br />
<textarea bind:value={inputDisplayText} on:input={readTextInput} />

<h2>Password</h2>
<input bind:value={password} />

<style>
    textarea {
        width: 100%;
        height: 200px;
    }
</style>
