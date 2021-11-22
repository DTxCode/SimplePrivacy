<script>
	import Header from "./components/Header.svelte";
	import Crypto from "./components/crypto/Crypto.svelte";
	import Footer from "./components/Footer.svelte";

	export let log;
</script>

<div class="page">
	<div class="content">
		<Header />
		<Crypto {log} />
	</div>
	<Footer />
</div>

<style>
	.page {
		position: relative;
		min-height: 100vh;
	}

	.content {
		padding-bottom: 2.5rem;
	}

	:global(body) {
		margin: 0;
	}
</style>
