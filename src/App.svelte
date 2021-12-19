<script>
	import Header from "./components/Header.svelte";
	import Crypto from "./components/crypto/Crypto.svelte";

	import Paper, { Content } from "@smui/paper";

	export let log;
</script>

<div class="page">
	<Header />
	<div class="crypto-container">
		<Paper>
			<Content>
				<Crypto {log} />
			</Content>
		</Paper>
	</div>
</div>

<style>
	.crypto-container {
		margin: 20px auto;
		width: 95%;
	}
</style>
