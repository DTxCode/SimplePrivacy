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
        "medical forms",
    ];

    let fileTypeIndex = 0;
    let fileType = fileTypeList[fileTypeIndex];

    onMount(() => {
        const interval = setInterval(() => {
            if (fileTypeIndex + 1 >= fileTypeList.length) {
                fileTypeIndex = 0;
            } else {
                fileTypeIndex = fileTypeIndex + 1;
            }

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
    .splash-container {
        height: 60vh;
        margin: 0px;
    }

    .img-container {
        width: 40%;
        height: 100%;
        float: left;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .text-container {
        width: 60%;
        height: 100%;
        float: left;
        display: flex;
        justify-content: flex-start;
        align-items: center;
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
