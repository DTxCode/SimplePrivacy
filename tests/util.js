/**
 * @param {string} name 
 * @param {Uint8Array} data 
 */
function createTestFile(name, data) {
    // jsdom's Blob implemention does not have .arrayBuffer()
    // Manually mocking File/Blob here as a workaround
    // https://github.com/jsdom/jsdom/issues/2555
    const mockFile = jest.fn();
    mockFile.mockImplementation(() => {
        return {
            "name": name,
            "arrayBuffer": () => {
                return Promise.resolve(data);
            }
        }
    })

    return new mockFile();
}

/**
 * Retruns a function that is capable of logging messages to Stdout. 
 * If message is longer than maxLength, truncates before logging.
 * 
 * @param {str} message 
 * @param {int} maxLength 
 */
function getTruncatedLogger(maxLength) {
    return (message) => {

        if (message.length > maxLength) {
            console.log(message.slice(0, maxLength) + "...[Truncated]");
        } else {
            console.log(message);
        }
    }
}

export default {
    createTestFile, getTruncatedLogger
}