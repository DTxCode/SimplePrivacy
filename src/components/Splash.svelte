<script>
    import Paper, { Title, Content } from "@smui/paper";
</script>

<div class="splash-container">
    <div class="text-container">
        <div class="text">
            <h2>Simple Privacy</h2>
            <h5>Password-protect your files</h5>
        </div>
    </div>

    <div class="icon">
        <h3>foo</h3>
    </div>
</div>

<style>
    .splash-container {
        height: 60vh;
        margin: 0px;
    }

    .text-container {
        width: 50%;
        height: 100%;
        float: left;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .text {
        text-align: right;
        vertical-align: middle;
        width: auto;
    }

    .text h2,
    h5 {
        margin: 20px;
        color: white;
    }

    .icon {
        width: 50%;
        float: left;
    }
</style>
