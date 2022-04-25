<script>
	import Header from "./components/Header.svelte";
	import Splash from "./components/Splash.svelte";
	import Crypto from "./components/Crypto.svelte";
	import { CONTEXT_LOG_KEY, CONTEXT_ENCODER_KEY, CONTEXT_DECODER_KEY } from "./scripts/constants";
	import { setContext } from "svelte";

	export let log;

	const encoder = new TextEncoder();
	const decoder = new TextDecoder();

	setContext(CONTEXT_LOG_KEY, log);
	setContext(CONTEXT_ENCODER_KEY, encoder);
	setContext(CONTEXT_DECODER_KEY, decoder);
</script>

<div class="page">
	<Header />
	<div class="content">
		<Splash />
		<Crypto />
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
