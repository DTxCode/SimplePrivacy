<script>
    import Button, { Label, Icon as ButtonIcon } from "@smui/button";
    import { Title, Subtitle } from "@smui/paper";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function dispatchEncryptEvent(doEncrypt) {
        dispatch("encrypt", {
            doEncrypt: doEncrypt,
        });
    }
</script>

<div>
    <Title>Choose whether to lock or unlock your data</Title>
    <Subtitle>Locking a file will hide its contents. Unlocking a file will give you the original version.</Subtitle>
</div>

<div>
    <Button touch on:click={() => dispatchEncryptEvent(true)} color="secondary" variant="raised">
        <ButtonIcon class="material-icons">https</ButtonIcon>
        <Label>Lock</Label>
    </Button>
    <Button touch on:click={() => dispatchEncryptEvent(false)} color="secondary" variant="raised">
        <ButtonIcon class="material-icons">no_encryption</ButtonIcon>
        <Label>UnLock</Label>
    </Button>
</div>

<style>
    /* .output-banner {
        margin: 10px 0px 10px 10px;
    } */

    /* .output-title {
        display: inline-block;
    } */

    /* .output-buttons {
        float: right;
    } */
</style>
