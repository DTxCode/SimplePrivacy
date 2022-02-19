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
		background-image: linear-gradient(10deg, #6200ee 0%, rgb(35, 35, 35) 100%);
		height: 100vh;
		overflow: auto;
	}

	:global(body) {
		margin: 0;
	}
</style>
