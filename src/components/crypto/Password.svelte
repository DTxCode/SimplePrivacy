<script>
    import Icon from "@smui/textfield/icon";
    import Textfield from "@smui/textfield";
    import { Title, Subtitle } from "@smui/paper";
    import IconButton, { Icon as ButtonIcon } from "@smui/icon-button";

    export let password;
    export let lock;

    let passwordVisible = false;
    $: passwordTextFieldType = passwordVisible ? "text" : "password";

    export function clear() {
        password = "";
    }
</script>

<div>
    {#if lock}
        <Title>Enter a strong password to lock the file</Title>
        <Subtitle>
            Your data will be protected only by the strength of this password. Pick something long and random.
        </Subtitle>
    {:else}
        <Title>Enter the password to unlock the file</Title>
        <Subtitle>You must use the same password that was used to lock the file.</Subtitle>
    {/if}
</div>

<div class="password-container">
    <div class="password-text">
        <Textfield type={passwordTextFieldType} variant="outlined" bind:value={password} label="Password">
            <Icon class="material-icons" slot="leadingIcon">vpn_key</Icon>
        </Textfield>
    </div>

    <div class="password-button">
        <IconButton toggle bind:pressed={passwordVisible}>
            <ButtonIcon class="material-icons" on>visibility_off</ButtonIcon>
            <ButtonIcon class="material-icons">visibility</ButtonIcon>
        </IconButton>
    </div>
</div>

<style>
    .password-container {
        display: flex;
        align-items: center;
    }

    .password-text {
        flex: 0 0 auto;
    }
</style>
