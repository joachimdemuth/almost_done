
import imageCompression from 'browser-image-compression';

export async function handleImageCompression(uncompressedFile) {
    const file = uncompressedFile;

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);
        const dimensions = await getImageDimensions(compressedFile);

        return {file: compressedFile, ...dimensions}
    } catch (error) {
        console.error('Image compression failed', error)
    }
}

function getImageDimensions(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function()  {

            resolve({ width: img.width, height: img.height })
        }
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    })
}