<script>
    import Icon from "@smui/textfield/icon";
    import Textfield from "@smui/textfield";
    import { Title, Subtitle } from "@smui/paper";

    export let password = "";

    export function clear() {
        password = "";
    }
</script>

<div class="selection-title">
    <Title>Enter a strong password</Title>
    <Subtitle>Your data is protected only by the strength of this password. Pick something long and random.</Subtitle>
</div>

<div class="password">
    <Textfield style="width: 30%" type="password" variant="outlined" bind:value={password} label="Password">
        <Icon class="material-icons" slot="leadingIcon">vpn_key</Icon>
    </Textfield>
</div>

<style>
    /* .selection-title {
        display: inline-block;
    } */

    /* .password {
        margin: 10px 0px;
    } */
</style>
