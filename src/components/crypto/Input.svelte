<script>
    import filesystem from "../../scripts/filesystem";
    import { Title, Subtitle, Content } from "@smui/paper";
    import Button, { Label, Icon as ButtonIcon } from "@smui/button";
    import { createEventDispatcher } from "svelte";

    export let data;
    export let fileName;

    const dispatch = createEventDispatcher();
    let fileInputReference;

    export function clear() {
        data = [];
        fileName = "";
        fileInputReference.value = "";
    }

    async function readFileInput(event) {
        const fileList = event.target.files;
        const file = fileList[0];

        fileName = file["name"];
        data = await filesystem.readFile(file);
    }

    function dispatchClearEvent() {
        dispatch("clear");
    }
</script>

<div class="input-title">
    <Title>Select the file or folder you want to protect</Title>
    <Subtitle>Your data never leaves your computer.</Subtitle>
</div>
<div class="right-aligned">
    <Button color="secondary" variant="outlined" touch on:click={() => dispatchClearEvent()}>
        <ButtonIcon class="material-icons">restart_alt</ButtonIcon>
        <Label>Reset</Label>
    </Button>
</div>
<div class="input-container">
    <div class="input-child">
        <Button
            color="secondary"
            variant="raised"
            touch
            on:click={() => {
                fileInputReference.click();
            }}
        >
            <ButtonIcon class="material-icons">upload_file</ButtonIcon>
            <Label>Select File or Zip</Label>
            <input style="display:none" type="file" bind:this={fileInputReference} on:change={readFileInput} />
        </Button>
    </div>

    <div class="input-child">
        <Content><b>{fileName}</b></Content>
    </div>
</div>

<style>
    .input-title {
        display: inline-block;
    }

    .right-aligned {
        float: right;
    }

    .input-container {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .input-child {
        flex-shrink: 1;
    }
</style>
