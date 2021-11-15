<script>
	import crypto from "./scripts/crypto.js";
	import filesystem from "./scripts/filesystem";
	import clipboard from "./scripts/clipboard";

	export let log;

	const encoder = new TextEncoder();
	const decoder = new TextDecoder();
	const DOWNLOAD_FILE_MIME_TYPE = "application/octet-stream";
	const DEFAULT_DECRYPTED_FILE_NAME = "decrypted.txt";
	const DEFAULT_ENCRYPTED_FILE_NAME = "encrypted.txt.gpg";

	let doEncrypt = true;

	let inputData;
	let inputDisplayText;
	let inputFileName;
	let fileInputReference;

	let password;

	let outputData;
	let outputDisplayText;

	$: (async () => {
		if (!inputData || !password) {
			outputDisplayText = "";
			return;
		}

		log(`Processing input with binary value ${inputData}`);

		try {
			if (doEncrypt) {
				// Take binary input and encrypt it into ASCII-armored String
				const encryptedASCII = await crypto.encrypt(
					inputData,
					password
				);

				outputData = encoder.encode(encryptedASCII);
				outputDisplayText = encryptedASCII;

				log(`Encrypted ${inputData} into message ${encryptedASCII}`);
			} else {
				// Convert binary input into (previously encrypted) ASCII-armored String and decrypt it into binary
				const inputDataAsASCII = decoder.decode(inputData);
				const decryptedBinary = await crypto.decrypt(
					inputDataAsASCII,
					password
				);

				outputData = decryptedBinary;
				outputDisplayText = decoder.decode(decryptedBinary);

				log(
					`Decrypted message ${inputDataAsASCII} into ${decryptedBinary}`
				);
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
		inputData = [];
		inputFileName = "";
		inputDisplayText = "";
		password = "";
		fileInputReference.value = "";
	}

	// ############################# Data Input Methods

	async function readClipboard() {
		const clipboardContents = await clipboard.read();

		inputData = encoder.encode(clipboardContents);
		inputDisplayText = clipboardContents;
	}

	async function readFileInput(event) {
		const fileList = event.target.files;
		const file = fileList[0];

		inputFileName = file["name"];
		inputData = await filesystem.readFile(file);
		inputDisplayText = "File uploaded!";
	}

	function readTextInput(event) {
		inputData = encoder.encode(inputDisplayText);
		// inputDisplayText manipulated by Svelte
	}

	// ############################## Data Output Methods

	async function saveToClipboard() {
		await clipboard.save(outputDisplayText);
	}

	function downloadOutput() {
		let fileName;
		if (doEncrypt) {
			fileName = inputFileName
				? inputFileName + ".gpg"
				: DEFAULT_ENCRYPTED_FILE_NAME;
		} else {
			if (inputFileName) {
				fileName = inputFileName.endsWith(".gpg")
					? inputFileName.slice(0, -4)
					: inputFileName;
			} else {
				fileName = DEFAULT_DECRYPTED_FILE_NAME;
			}
		}

		log("Writing file with name " + fileName + " and data " + outputData);

		filesystem.writeFile(fileName, DOWNLOAD_FILE_MIME_TYPE, outputData);
	}
</script>

<h1>Option</h1>
<label>
	<input
		type="radio"
		group={doEncrypt}
		name="doEncrypt"
		value={true}
		checked="checked"
		on:change={onRadioChange}
	/>
	Encrypt
</label>

<label>
	<input
		type="radio"
		group={doEncrypt}
		name="doEncrypt"
		value={false}
		on:change={onRadioChange}
	/>
	Decrypt
</label>
<br />
<button on:click={clear}> Clear </button>

<h1>Input</h1>
<button on:click={readClipboard}> Paste </button>
<input type="file" bind:this={fileInputReference} on:change={readFileInput} />
<br />
<textarea bind:value={inputDisplayText} on:input={readTextInput} />

<h1>Password</h1>
<input bind:value={password} />

<h1>Output</h1>
<button on:click={saveToClipboard}> Copy </button>
<button on:click={downloadOutput}> Download </button>
<br />
<textarea disabled value={outputDisplayText} />

<style>
	textarea {
		width: 50%;
		height: 200px;
	}
</style>
