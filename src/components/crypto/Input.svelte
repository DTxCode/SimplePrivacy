<script>
    import filesystem from "../../scripts/filesystem";
    import Textfield from "@smui/textfield";
    import Icon from "@smui/textfield/icon";

    import { Title, Subtitle, Content } from "@smui/paper";
    import Button, { Label, Icon as ButtonIcon } from "@smui/button";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const encoder = new TextEncoder();

    export let inputData;
    export let fileName;
    export let password = "";

    let fileInputReference;
    let inputDisplayText = "";
    let disableInput = false;

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
        disableInput = true;
        inputDisplayText = `File ${fileName} selected`;
        inputData = await filesystem.readFile(file);
    }

    function clear() {
        inputDisplayText = "";
        fileName = "";
        password = "";
        fileInputReference.value = "";
        disableInput = false;
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
        <div class="input-banner">
            <div class="input-title">
                <Title>Input</Title>
            </div>
            <div class="input-buttons">
                <Button
                    variant="outlined"
                    touch
                    on:click={() => {
                        clear();
                        dispatchClearEvent();
                    }}
                >
                    <ButtonIcon class="material-icons">delete</ButtonIcon>
                    <Label>Clear</Label>
                </Button>
                <Button
                    variant="outlined"
                    touch
                    on:click={() => {
                        fileInputReference.click();
                    }}
                >
                    <ButtonIcon class="material-icons">upload_file</ButtonIcon>
                    <Label>Upload File or Zip</Label>
                    <input style="display:none" type="file" bind:this={fileInputReference} on:change={readFileInput} />
                </Button>
            </div>
        </div>

        <Textfield
            textarea
            disabled={disableInput}
            style="width: 100%; height:200px;"
            bind:value={inputDisplayText}
            label="Enter the data you want to encrypt, or upload a file"
        />
    </div>
    <div class="password">
        <Textfield style="width: 100%;" variant="outlined" bind:value={password} label="Password">
            <Icon class="material-icons" slot="leadingIcon">vpn_key</Icon>
        </Textfield>
    </div>

    <div>
        <Button touch on:click={() => dispatchEncryptEvent(true)} variant="raised">
            <ButtonIcon class="material-icons">https</ButtonIcon>
            <Label>Encrypt</Label>
        </Button>
        <Button touch on:click={() => dispatchEncryptEvent(false)} variant="raised">
            <ButtonIcon class="material-icons">no_encryption</ButtonIcon>

            <Label>Decrypt</Label>
        </Button>
    </div>
</div>

<style>
    .input-banner {
        margin: 10px 0px 10px 10px;
    }

    .input-title {
        display: inline-block;
    }

    .input-buttons {
        float: right;
    }

    .password {
        margin: 10px 0px;
    }
</style>
