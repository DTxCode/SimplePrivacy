<script>
	import funcs from './scripts/crypto.js';

	let doEncrypt = true;

	let input = '';
	let output = '';
	let password;

	$: (async() => {
		if (!input || !password) {
			return;
		}

		try {
			if (doEncrypt) {
				output = await funcs.encrypt(input, password);
			} else {
				output = await funcs.decrypt(input, password);
			}
		} catch (e) {
			output = e;
		}

	})();

	function onRadioChange() {
		input = output;
		doEncrypt = !doEncrypt;
	}

	async function readClipboard() {
		await navigator.clipboard.readText()
			.then(text => {
				input = text;
			}).catch(err => {
				input = err;
			});
	}

	async function writeClipboard() {
		await navigator.clipboard.writeText(output);
	}

</script>

<h1>Option</h1>
<label>
	<input type=radio group={doEncrypt} name="doEncrypt" value={true} checked="checked" on:change={onRadioChange}>
	Encrypt
</label>

<label>
	<input type=radio group={doEncrypt} name="doEncrypt" value={false} on:change={onRadioChange}>
	Decrypt
</label>

<h1>Input</h1>
<button on:click={readClipboard}>
	Paste
</button>
<br>
<textarea bind:value={input}></textarea>

<h1>Password</h1>
<input bind:value={password}>

<h1>Output</h1>
<button on:click={writeClipboard}>
	Copy
</button>
<br>
<textarea disabled value={output}></textarea>

<style>
	textarea { width: 50%; height: 200px; }
</style>
