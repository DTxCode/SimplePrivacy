// 'file' is file object returned by file input button 
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

function writeFile(fileName, mimeType, data) {
    const blob = new Blob([data], {
        type: mimeType
    });

    const url = window.URL.createObjectURL(blob)

    var element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', fileName);
    element.click();
    
    setTimeout(() => window.URL.revokeObjectURL(url), 1000)
}

export default {
    readFile,
    writeFile
}