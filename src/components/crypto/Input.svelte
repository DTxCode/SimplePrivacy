<script>
    import filesystem from "../../scripts/filesystem";
    import clipboard from "../../scripts/clipboard";
    import Textfield from "@smui/textfield";
    import Button, { Label, Icon } from "@smui/button";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const encoder = new TextEncoder();

    export let inputData;
    export let fileName;
    export let password = "";

    let fileInputReference;
    let inputDisplayText = "";

    $: inputData = encoder.encode(inputDisplayText);

    // async function readClipboard() {
    //     const clipboardContents = await clipboard.read();

    //     inputData = encoder.encode(clipboardContents);
    //     inputDisplayText = clipboardContents;
    // }

    async function readFileInput(event) {
        const fileList = event.target.files;
        const file = fileList[0];

        fileName = file["name"];
        inputData = await filesystem.readFile(file);
        inputDisplayText = "File uploaded!";
    }

    function clear() {
        inputDisplayText = "";
        fileName = "";
        password = "";
        fileInputReference.value = "";
    }

    function dispatchClearEvent() {
        dispatch("clear");
    }

    function dispatchEncryptEvent(doEncrypt) {
        dispatch("encrypt", {
            doEncrypt: doEncrypt,
        });
    }
</script>

<div>
    <div>
        <h2>Input</h2>
        <Button
            variant="outlined"
            on:click={() => {
                fileInputReference.click();
            }}
        >
            <Icon class="material-icons">upload_file</Icon>
            <Label>Upload File</Label>
            <input style="display:none" type="file" bind:this={fileInputReference} on:change={readFileInput} />
        </Button>
        <Button
            variant="outlined"
            on:click={() => {
                clear();
                dispatchClearEvent();
            }}
        >
            <Icon class="material-icons">delete</Icon>
            <Label>Clear</Label>
        </Button>
        <Textfield textarea style="width: 100%; height:200px;" bind:value={inputDisplayText} />
    </div>
    <div>
        <h2>Password</h2>
        <Textfield variant="outlined" bind:value={password} />
    </div>
    <div>
        <Button on:click={() => dispatchEncryptEvent(true)} variant="raised">
            <Label>Encrypt</Label>
        </Button>
        <Button on:click={() => dispatchEncryptEvent(false)} variant="raised">
            <Label>Decrypt</Label>
        </Button>
    </div>
</div>

<style>
</style>
