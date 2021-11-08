/**
 * Reads contents of user's clipboard.
 * 
 * @returns Promise<string> with clipboard data. 
 */
function readClipboard() {
    return navigator.clipboard.readText()
        .then(text => {
            return text;
        }).catch(err => {
            return err;
        });
}

/**
 * Saves given string to user's clipboard.
 * 
 * @param {string} contents 
 * @returns Promise<void> that resolves when data has been saved.
 */
function saveToClipboard(contents) {
    return navigator.clipboard.writeText(contents);
}

export default {
    readClipboard,
    saveToClipboard
}