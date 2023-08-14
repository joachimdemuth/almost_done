
import imageCompression from 'browser-image-compression';

export async function handleImageCompression(uncompressedFile) {
    // console.log("starting compression for:", uncompressedFile)


    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(uncompressedFile, options);
        // console.log("compression complete:", compressedFile)
        const dimensions = await getImageDimensions(compressedFile);
        // console.log("dimensions:", dimensions)
        
        return { newFile: compressedFile, width: dimensions.width, height: dimensions.height }
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