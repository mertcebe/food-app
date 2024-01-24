import { auth, database } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useProfile() {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        getDoc(doc(database, `users/${auth.currentUser?.uid}`))
        .then((snapshot) => {
            setData(snapshot.data());
            setLoading(false);
        })
    }, []);

    return { loading, data };
}