<script>
    export let doEncrypt = true;

    function onRadioChange() {
        doEncrypt = !doEncrypt;
    }
</script>

<h2>Option</h2>
<label>
    <input type="radio" group={doEncrypt} name="doEncrypt" value={true} checked="checked" on:change={onRadioChange} />
    Encrypt
</label>

<label>
    <input type="radio" group={doEncrypt} name="doEncrypt" value={false} on:change={onRadioChange} />
    Decrypt
</label>
