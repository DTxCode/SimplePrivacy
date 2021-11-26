<script>
    export let doEncrypt = true;
</script>

<h2>Options</h2>
<div>
    <div class="big-btn">
        <label>
            <input type="radio" bind:group={doEncrypt} name="doEncrypt" value={true} />
            Encrypt
        </label>
    </div>
    <div class="big-btn">
        <label>
            <input type="radio" bind:group={doEncrypt} name="doEncrypt" value={false} />
            Decrypt
        </label>
    </div>
</div>

<style>
</style>
