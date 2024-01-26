import { doc, getDoc, setDoc } from "firebase/firestore"
import { database } from "./firebaseConfig"

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