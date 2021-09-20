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

function writeFile(fileName, fileMIMEType, isBase64, data) {
    const base64String = isBase64 ? ';base64' : '';

    var element = document.createElement('a');
    element.setAttribute('href', 'data:' + fileMIMEType + base64String + ',' + data);
    element.setAttribute('download', fileName);
    element.click();
}

export default {
    readFile,
    writeFile
}