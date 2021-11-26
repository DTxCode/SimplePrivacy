<script>
	import Header from "./components/Header.svelte";
	import Crypto from "./components/crypto/Crypto.svelte";
	import Footer from "./components/Footer.svelte";

	export let log;

	let accentColor = "rgb(25, 25, 230)";
	let footerHeight = "2.5rem";
</script>

<div class="page">
	<div class="content" style="--footerHeight: {footerHeight}">
		<Header {accentColor} />
		<Crypto {log} />
	</div>
	<Footer {accentColor} {footerHeight} />
</div>

<style>
	.page {
		background-color: rgb(240, 240, 240);
		position: relative;
		min-height: 100vh;
	}

	.content {
		padding-bottom: var(--footerHeight);
	}

	:global(h1),
	:global(h2) {
		font-family: "Outfit", sans-serif;
	}

	:global(.big-btn) {
		border: solid 1px black;
		width: 45%;
		display: inline-block;
		margin: 5px;
		margin-left: 0px;
	}

	:global(label) {
		font-family: Arial, Helvetica, sans-serif;
		padding: 15px 10px 15px 10px;
		width: 100%;
		height: 100%;
		display: inline-block;
		cursor: pointer;
	}

	:global(body) {
		margin: 0;
	}
</style>
