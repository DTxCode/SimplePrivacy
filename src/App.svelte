<script>
	import crypto from './scripts/crypto.js';
	import filesystem from './scripts/filesystem';
	import clipboard from './scripts/clipboard';
	
	let doEncrypt = true;

	let inputDisplayText = '';
	let inputInfo; //binary and fileName

	let password;

	let outputDisplayText = '';
	let outputInfo; //binary

	$: (async() => {
		if (!inputInfo || !password) {
			outputDisplayText = '';
			return;
		}

		try {
			if (doEncrypt) {
				outputDisplayText = await crypto.encrypt(inputInfo.binaryFileContents, password);
				outputInfo = null;
			} else {
				const outputBinary = await crypto.decrypt(inputDisplayText, password);

				if (!inputInfo.fileName) { // Didn't come from file, so definitely ASCII
					const decoder = new TextDecoder();

					outputDisplayText = decoder.decode(outputBinary);
				} else {
					outputDisplayText = outputBinary;
				}

				outputInfo = {
					binaryFileContents: outputBinary
				}
			}

		} catch (e) {
			outputDisplayText = e; 
		}

	})();

	function onRadioChange() {
		inputDisplayText = '';
		inputInfo = null;
		doEncrypt = !doEncrypt;
	}

	// ############################# Data Input Methods

	async function readClipboard() {
		const clipboardContents = await clipboard.readClipboard();

		const encoder = new TextEncoder()
		const binaryFileContents = encoder.encode(clipboardContents);

		inputDisplayText = clipboardContents;
		inputInfo = {
			binaryFileContents: binaryFileContents
		}
	}

	async function readFileInput(event) {
		const fileList = event.target.files;
		const decoder = new TextDecoder();

		inputInfo = await filesystem.readFile(fileList[0]);
		inputDisplayText = decoder.decode(inputInfo.binaryFileContents)   
	}

	function readTextInput(event) {
		const encoder = new TextEncoder()
		const binaryFileContents = encoder.encode(inputDisplayText);

		inputInfo = {
			binaryFileContents: binaryFileContents
		}
	}

	// ############################## Data Output Methods

	async function saveToClipboard() {
		await clipboard.saveToClipboard(outputDisplayText);
	}

	function downloadOutput() {
		let fileName;
		let fileType;
		let isBase64;
		let data;
		
		if (doEncrypt) {
			fileName = inputInfo.fileName ? inputInfo.fileName + '.gpg' : 'output.txt.gpg';

			fileType = 'text/plain'; // Encryption always outputs ASCII text
			isBase64 = false;
			data = outputDisplayText;
		} else {
			if (inputInfo.fileName) {
				fileName = inputInfo.fileName.endsWith('.gpg') ? inputInfo.fileName.slice(0, -4) : inputInfo.fileName;
			} else {
				fileName = 'output.txt';
			}

			fileType = 'application/octet-stream'; // Decryption always outputs binary
			isBase64 = true;
			data = btoa(encodeURIComponent(outputInfo.binaryFileContents));

		}

		filesystem.writeFile(fileName, fileType, data)
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
<input type="file" on:change={readFileInput}>
<br>
<textarea bind:value={inputDisplayText} on:input={readTextInput}></textarea>

<h1>Password</h1>
<input bind:value={password}>

<h1>Output</h1>
<button on:click={saveToClipboard}>
	Copy
</button>
<button on:click={downloadOutput}>
	Download
</button>
<br>
<textarea disabled value={outputDisplayText}></textarea>

<style>
	textarea { width: 50%; height: 200px; }
</style>
