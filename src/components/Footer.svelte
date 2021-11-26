<script>
    export let accentColor;
    export let footerHeight;
</script>

<div class="footer" style="--accentColor: {accentColor}; --footerHeight: {footerHeight}">
    <p>Github</p>
</div>

<style>
    .footer {
        background-color: rgb(46, 46, 46);
        position: absolute;
        bottom: 0;
        width: 100%;
        height: var(--footerHeight);
    }

    p {
        text-align: center;
        color: white;
    }
</style>
