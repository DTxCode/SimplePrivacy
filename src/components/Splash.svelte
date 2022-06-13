<script>
    import { onMount } from "svelte";

    const fileTypeChangeDelay = 3000;
    const fileTypeList = [
        "documents",
        "photos",
        "tax returns",
        "bank statements",
        "work documents",
        "personal information",
        "messages",
        "medical records",
    ];

    let fileTypeIndex = 0;
    let fileType = fileTypeList[fileTypeIndex];

    onMount(() => {
        const interval = setInterval(() => {
            fileTypeIndex = (fileTypeIndex + 1) % fileTypeList.length;
            fileType = fileTypeList[fileTypeIndex];
        }, fileTypeChangeDelay);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<div class="splash-container">
    <div class="img-container">
        <div class="icon">
            <img src="images/lock.png" alt="lock" width="200" height="200" />
        </div>
    </div>

    <div class="text-container">
        <div class="text">
            <h2>Simple Privacy</h2>
            <h5>
                Protect your <b>{fileType}</b>
            </h5>
        </div>
    </div>
</div>

<style>
    img {
        max-width: 100%;
        display: block;
    }

    .splash-container {
        height: 60vh;
        margin: 0px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: center;
    }

    .text {
        text-align: left;
        vertical-align: middle;
    }

    .text h2,
    h5 {
        margin: 20px;
        color: white;
    }
</style>
