/**
 * Reads given file into memory.
 * 
 * @param {File} file 
 * @returns Promise<ArrayBuffeR> that resolves with file's binary contents
 */
function readFile(file) {
    return file.arrayBuffer();
}

/**
 * Writes given data to disk using the given file name.
 * 
 * @param {string} fileName 
 * @param {string} mimeType 
 * @param {ArrayBuffer} data 
 */
function writeFile(fileName, mimeType, data) {
    const blob = new Blob([data], {
        type: mimeType
    });

    const url = window.URL.createObjectURL(blob)

    var element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', fileName);
    element.click();

    window.URL.revokeObjectURL(url)
}

export default {
    readFile,
    writeFile
}