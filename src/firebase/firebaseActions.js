import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore"
import { database } from "./firebaseConfig"
import { ImageApload } from "@/files/ImageApload";

export const setDataToFirebase = (path, data) => {
    setDoc(doc(database, `${path}`), data);
}

export const getUser = async (uid) => {
    return new Promise((resolve) => {
        getDoc(doc(database, `users/${uid}`))
            .then((snapshot) => {
                resolve(snapshot.data());
            })
    })
}

export const getOffersLength = async (uid) => {
    return new Promise((resolve) => {
        getDocs(query(collection(database, `users/${uid}/offers`)))
            .then((snapshot) => {
                resolve(snapshot.size);
            })
    })
}

export const updateMenuItem = async (type, id, data) => {
    if (data.img.file) {
        await ImageApload(data.img.file)
            .then((snapshot) => {
                updateDoc(doc(database, `menu/categories/${type}/${id}`), {
                    ...data,
                    img: snapshot.src
                })
            })
    }
    else {
        await
            updateDoc(doc(database, `menu/categories/${type}/${id}`), {
                ...data
            })
    }
}

export const deleteMenuItem = (type, id) => {
    return new Promise((resolve, reject) => {
        try {
            deleteDoc(doc(database, `menu/categories/${type}/${id}`))
                .then(() => {
                    resolve(true);
                })
        } catch (error) {
            reject(error);
        }
    })
}

export const setMenuItemToFirebase = async (type, data) => {
    await ImageApload(data.img.file)
        .then(async (snapshot) => {
            await addDoc(collection(database, `menu/categories/${type}`), {
                ...data,
                img: snapshot.src
            })
        });
}