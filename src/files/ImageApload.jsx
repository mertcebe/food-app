import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const ImageApload = async (file) => {
    return new Promise(async (resolve) => {
        if (typeof file !== 'undefined') {
            const storage = getStorage();

            const metadata = {
                contentType: `${file.type}`
            };

            const storageRef = ref(storage, 'images/' + file.name);
            const uploadTask = await uploadBytesResumable(storageRef, file, metadata);
            getDownloadURL(uploadTask.ref).then((downloadURL) => {
                resolve({
                    name: file.name,
                    type: file.type,
                    src: downloadURL
                })
            });
        }
        else {
            resolve('');
        }
    })
}