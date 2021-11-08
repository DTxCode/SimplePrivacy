<script>
	import crypto from './scripts/crypto.js';
	import filesystem from './scripts/filesystem';
	import clipboard from './scripts/clipboard';
	
	export let log;

	const encoder = new TextEncoder();

	let doEncrypt = true;

	let inputDisplayText = '';
	let inputInfo; //binary and fileName
	let fileInputReference;

	let password;

	let outputDisplayText = '';
	let outputInfo; //binary

	$: (async() => {
		if (!inputInfo || !password) {
			outputDisplayText = '';
			return;
		}

		log(`Processing input with ASCII value ${inputDisplayText} and binary value ${inputInfo.binaryFileContents}`)

		try {
			if (doEncrypt) {
				const encryptedASCIIMessage = await crypto.encrypt(inputInfo.binaryFileContents, password);
				
				log(`Encrypted into ASCII message ${encryptedASCIIMessage}`)

				outputDisplayText = encryptedASCIIMessage;
				outputInfo = {
					binaryFileContents: encoder.encode(encryptedASCIIMessage)
				}
			} else {
				const decryptedBinaryMessage = await crypto.decrypt(inputDisplayText, password);

				log(`Decrypted into binary message ${decryptedBinaryMessage}`)

				outputDisplayText = "Download file to view decrypted binary"
				outputInfo = {
					binaryFileContents: decryptedBinaryMessage
				}
			}
		} catch (e) {
			outputDisplayText = e; 
		}

	})();

	function onRadioChange() {
		clear();
		doEncrypt = !doEncrypt;
	}

	function clear() {
		inputDisplayText = '';
		password = '';
		inputInfo = null;
		fileInputReference.value = '';
	}
	
	// ############################# Data Input Methods

	async function readClipboard() {
		const clipboardContents = await clipboard.readClipboard();

		const binaryFileContents = encoder.encode(clipboardContents);

		inputInfo = {
			binaryFileContents: binaryFileContents
		}
		inputDisplayText = clipboardContents;
	}

	async function readFileInput(event) {
		const fileList = event.target.files;

		inputInfo = await filesystem.readFile(fileList[0]);
		inputDisplayText = 'File uploaded!';
	}

	function readTextInput(event) {
		const binaryFileContents = encoder.encode(inputDisplayText);

		inputInfo = {
			binaryFileContents: binaryFileContents
		}
		// inputDisplayText manipulated by Svelte
	}

	// ############################## Data Output Methods

	async function saveToClipboard() {
		await clipboard.saveToClipboard(outputDisplayText);
	}

	function downloadOutput() {
		let fileName;
		let mimeType;
		let data;
		
		if (doEncrypt) {
			fileName = inputInfo.fileName ? inputInfo.fileName + '.gpg' : 'output.txt.gpg';

			mimeType = 'text/plain'; // Encryption always outputs ASCII text
			data = outputDisplayText;
		} else {
			if (inputInfo.fileName) {
				fileName = inputInfo.fileName.endsWith('.gpg') ? inputInfo.fileName.slice(0, -4) : inputInfo.fileName;
			} else {
				fileName = 'output.txt';
			}

			mimeType = 'application/octet-stream'; // Decryption always outputs binary
			data = outputInfo.binaryFileContents;
		}

		log("Writing file with name " + fileName + " type " + mimeType + " data " + data);
		filesystem.writeFile(fileName, mimeType, data)
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
<br>
<button on:click={clear}>
	Clear
</button>

<h1>Input</h1>
<button on:click={readClipboard}>
	Paste
</button>
<input type="file" bind:this={fileInputReference} on:change={readFileInput}>
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
