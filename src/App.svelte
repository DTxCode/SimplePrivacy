<script>
	import Header from "./components/Header.svelte";
	import Splash from "./components/Splash.svelte";
	import Crypto from "./components/Crypto.svelte";
	import About from "./components/About.svelte";
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
		<About />
	</div>
</div>

<style>
	.content {
		/* background-image: linear-gradient(165deg, #6200ee, rgb(2, 2, 27)); */
		background: linear-gradient(165deg, #d63c3c, #6200ee, #212335);
		animation: Pulse 25s ease infinite;
		background-size: 300% 300%;
		height: auto;
		overflow-y: auto;
	}

	@keyframes Pulse {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	:global(body) {
		margin: 0;
	}
</style>
