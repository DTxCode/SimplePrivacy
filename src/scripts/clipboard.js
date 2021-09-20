async function readClipboard() {
    return await navigator.clipboard.readText()
            .then(text => {
                return text;
            }).catch(err => {
                return err;
            });
}

async function saveToClipboard(contents) {
    return await navigator.clipboard.writeText(contents);
}

export default {
    readClipboard,
    saveToClipboard
}