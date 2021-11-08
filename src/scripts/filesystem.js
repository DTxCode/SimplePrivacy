/**
 * Reads given file into memory.
 * 
 * @param {File} file 
 * @returns Promise that resolves with an object containing the file's name and contents.
 */
function readFile(file) {
    return new Promise((resolve, reject) => {
        const fileName = file['name'];
    
        let binaryFileContents;
        const fileReader = new FileReader();
        fileReader.addEventListener('load', (event) => {
            binaryFileContents = event.target.result;

            resolve({
                fileName,
                binaryFileContents
            });
        });
    
        fileReader.readAsArrayBuffer(file);
    });
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