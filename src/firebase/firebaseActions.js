import { doc, getDoc, setDoc } from "firebase/firestore"
import { database } from "./firebaseConfig"

export const setDataToFirebase = (path, title, data) => {
    setDoc(doc(database, `${path}/${title}`), data);
}

export const getUser = async (uid) => {
    return new Promise((resolve) => {
        getDoc(doc(database, `users/${uid}`))
        .then((snapshot) => {
            resolve(snapshot.data());
        })
    })
}