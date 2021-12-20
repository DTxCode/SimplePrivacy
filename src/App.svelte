<script>
	import Header from "./components/Header.svelte";
	import Crypto from "./components/crypto/Crypto.svelte";

	import Paper, { Content } from "@smui/paper";

	export let log;
</script>

<div class="header">
	<Header />
</div>

<div class="crypto-container">
	<Paper>
		<Content>
			<Crypto {log} />
		</Content>
	</Paper>
</div>

<style>
	.crypto-container {
		margin: 20px auto;
		width: 90%;
	}
</style>
