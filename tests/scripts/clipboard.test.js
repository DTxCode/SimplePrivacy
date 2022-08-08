import clipboard from '../../src/scripts/clipboard';

test('reads content after saving', async () => {
    const data = "abc";

    const mockClipboard = {
        writeText: jest.fn().mockImplementation(() => {
            return Promise.resolve()
        }),
        readText: jest.fn().mockImplementation(() => {
            return Promise.resolve(data)
        })
    };

    global.navigator.clipboard = mockClipboard;

    await clipboard.save(data).then(() => {
        expect(clipboard.read()).resolves.toBe(data);
    })
});

test('doesnt throw exception for empty read', async () => {
    const mockClipboard = {
        readText: jest.fn().mockImplementation(() => {
            return Promise.resolve("")
        })
    };

    global.navigator.clipboard = mockClipboard;

    await expect(clipboard.read()).resolves.toBe("");
});

test('rejects if missing permission on write', async () => {
    const data = "abc";

    const mockClipboard = {
        writeText: jest.fn().mockImplementation(() => {
            return Promise.reject();
        }),
    };

    global.navigator.clipboard = mockClipboard;

    await expect(clipboard.save(data)).rejects.toEqual();
});
