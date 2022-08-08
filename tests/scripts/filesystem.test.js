import filesystem from '../../src/scripts/filesystem';
import util from '../util';

test('reads contents of File as binary array', async () => {
    const data = new Uint8Array([99, 100]);

    const testFile = util.createTestFile('testFile.txt', data);

    await expect(filesystem.readFile(testFile)).resolves.toEqual(data);
});

test('saves file using ObjectURL', async () => {
    const data = new Uint8Array([99, 100]);
    const fileName = "fileName";
    const objectUrl = "blob:https://www.google.com/72882cf4-1efa-454f-ba1d-dcf9d726ae9c";

    global.window.URL.createObjectURL = jest.fn().mockImplementation((blob) => {
        return objectUrl;
    });
    global.window.URL.revokeObjectURL = jest.fn();

    const mockSetAttribute = jest.fn();
    const mockClick = jest.fn();
    jest.spyOn(global.document, 'createElement').mockReturnValue({
        setAttribute: mockSetAttribute,
        click: mockClick
    });

    filesystem.writeFile(fileName, 'text/plain', data);
    expect(mockSetAttribute.mock.calls[0]).toEqual(["href", objectUrl]);
    expect(mockSetAttribute.mock.calls[1]).toEqual(["download", fileName]);
    expect(mockClick.mock.calls).toEqual([[]]);
});