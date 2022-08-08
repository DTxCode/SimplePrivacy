<script>
    import filesystem from "../../scripts/filesystem";
    import { createEventDispatcher } from "svelte";
    import { Title, Content } from "@smui/paper";
    import Button, { Label, Icon as ButtonIcon } from "@smui/button";

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

        data = await filesystem.readFile(file);
        fileName = file["name"];
        // TODO: Revisit auto lock vs unlock detection?
        // If selected file is not encrypted, then the operation that needs to be done is "lock"
        // lock = !crypto.isEncrypted(data, decoder);
    }

    function dispatchClearEvent() {
        dispatch("clear");
    }
</script>

<div class="input-title">
    <Title>Select a file</Title>
</div>
<div class="reset-button">
    <Button variant="outlined" touch on:click={() => dispatchClearEvent()} data-testid="reset">
        <ButtonIcon class="material-icons">restart_alt</ButtonIcon>
        <Label>Reset</Label>
    </Button>
</div>
<div class="input-container">
    <div class="input-child">
        <Button
            variant="raised"
            touch
            on:click={() => {
                fileInputReference.click();
            }}
        >
            <ButtonIcon class="material-icons">upload_file</ButtonIcon>
            <Label>Select</Label>
            <input
                style="display:none"
                type="file"
                bind:this={fileInputReference}
                on:change={readFileInput}
                data-testid="file-selector"
            />
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

    .reset-button {
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

    @media (max-width: 600px) {
        .reset-button {
            float: none;
        }
    }
</style>
