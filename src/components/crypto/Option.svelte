<script>
    import { Title, Subtitle } from "@smui/paper";
    import Radio from "@smui/radio";
    import FormField from "@smui/form-field";

    export let lock;

    export function clear() {
        lock = true;
    }
</script>

<div>
    <Title>Choose whether to lock or unlock your file</Title>
    <Subtitle>Locking a file will hide its contents. Unlocking a file will give you the original version.</Subtitle>
</div>

<div class="form-container">
    <div class="form-child">
        <FormField>
            <Radio bind:group={lock} value={true} />
            <span slot="label">Lock</span></FormField
        >
    </div>

    <div class="form-child">
        <FormField>
            <Radio bind:group={lock} value={false} />
            <span slot="label">Unlock</span>
        </FormField>
    </div>
</div>

<style>
    .form-container {
        display: flex;
        flex-direction: column;
    }

    span {
        font-size: large;
    }
</style>
