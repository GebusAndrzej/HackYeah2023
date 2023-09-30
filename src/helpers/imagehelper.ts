export const base64ToBlob = (base64: string): Blob => {
    const [ base64MediaType, base64FileContent ] = base64.split(';base64,');
    const contentType = base64MediaType.split(':')[1];
    const binaryFileContent = window.atob(base64FileContent);
    const fileBits = Uint8Array.from(binaryFileContent, c => c.charCodeAt(0));

    return new Blob([ fileBits ], { type: contentType });
};

export const getBase64 = (file: File) => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        res(reader.result)
    };
    reader.onerror = function (error) {
        rej(error)
    };
})