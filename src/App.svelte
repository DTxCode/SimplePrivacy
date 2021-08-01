<script>
	import funcs from './scripts/crypto.js';

	let plaintext;
	let password;

	let encrypted;
	$: (async() => {
		if (plaintext && password) {
			encrypted = await funcs.encrypt(plaintext, password);
		} else {
			encrypted = '';
		}
	})();

</script>

<h1>Input</h1>
<textarea bind:value={plaintext}></textarea>

<h1>Password</h1>
<input bind:value={password}>

<h1>Encrypted</h1>
<textarea disabled value={encrypted}></textarea>

<style>
	textarea { width: 50%; height: 200px; }
</style>
