import { doc, setDoc } from "firebase/firestore"
import { database } from "./firebaseConfig"

export const setDataToFirebase = (path, title, data) => {
    setDoc(doc(database, `${path}/${title}`), data);
}