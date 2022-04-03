<script>
	import Header from "./components/Header.svelte";
	import Splash from "./components/Splash.svelte";
	import Crypto from "./components/crypto/Crypto.svelte";

	export let log;
</script>

<div class="page">
	<Header />
	<div class="content">
		<Splash />
		<Crypto {log} />
	</div>
</div>

<style>
	.content {
		background-image: linear-gradient(180deg, #6200ee 40%, rgb(45, 45, 45) 100%);
		height: auto;
		overflow-y: auto;
	}

	:global(body) {
		margin: 0;
	}
</style>
