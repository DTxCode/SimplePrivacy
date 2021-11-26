<script>
    import filesystem from "../../scripts/filesystem";
    import clipboard from "../../scripts/clipboard";

    const encoder = new TextEncoder();

    export let inputData;
    export let fileName;
    export let password;

    let inputMode = "file";
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
<div>
    <div class="big-btn">
        <label>
            <input type="radio" bind:group={inputMode} name="inputMode" value={"file"} />
            Upload File
        </label>
    </div>
    <div class="big-btn">
        <label>
            <input type="radio" bind:group={inputMode} name="inputMode" value={"text"} />
            Input Text
        </label>
    </div>
</div>

{#if inputMode == "file"}
    <input type="file" bind:this={fileInputReference} on:change={readFileInput} />
{:else}
    <textarea bind:value={inputDisplayText} on:input={readTextInput} />
{/if}

<h2>Password</h2>
<input bind:value={password} />

<style>
    textarea {
        width: 100%;
        height: 200px;
        resize: none;
    }
</style>
