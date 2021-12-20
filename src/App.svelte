<script>
	import Header from "./components/Header.svelte";
	import Crypto from "./components/crypto/Crypto.svelte";

	import Paper, { Title, Content } from "@smui/paper";

	export let log;
</script>

<div>
	<div class="header">
		<Header />
	</div>

	<!-- <div class="home-banner">
		<Paper style="height: 20em">
			<Title>Hello!</Title>
		</Paper>
	</div> -->

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
		width: 90%;
	}

	:global(body) {
		margin: 0;
		background-color: rgb(235, 235, 235);
	}
</style>
