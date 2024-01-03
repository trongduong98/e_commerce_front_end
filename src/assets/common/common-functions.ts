const encodeBase64 = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
}

const convertBufferToBase64 = (bufferArray: Buffer) => {
    let binary = '';
    let bytes = new Uint8Array(bufferArray);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return binary;
}

const decodeBase64ToFile = (dataUrl: string, filename: string) => {
    var arr: any = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]), 
    n = bstr.length, 
    u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

const formatDate = (date: Date) => {
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
  }


export {
    encodeBase64,
    convertBufferToBase64,
    decodeBase64ToFile,
    formatDate
}