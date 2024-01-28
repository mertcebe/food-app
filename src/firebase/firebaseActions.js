import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
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

export const updateMenuItem = async (type, id, data) => {
    await ImageApload(data.img.file)
        .then((snapshot) => {
            updateDoc(doc(database, `menu/categories/${type}/${id}`), {
                ...data,
                img: snapshot.src
            })
        })
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