export const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer) => {
    const uintArray = new Uint8Array(arrayBuffer);
    const binaryString = uintArray.reduce(
        (str, byte) => str + String.fromCharCode(byte),
        ""
    );
    return btoa(binaryString);
};