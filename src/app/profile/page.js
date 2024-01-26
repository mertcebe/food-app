"use client";
import React, { useEffect, useState } from "react";
import { auth, database } from "@/firebase/firebaseConfig";
import { useAuthorized } from "@/auth/authFunctions";
import { useRouter } from "next/navigation";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { getUser } from "@/firebase/firebaseActions";
import Loading from "@/components/icons/Loading";
import data from '../../data/data.json';

const ProfilePage = async () => {
    let [user, setUser] = useState();
    const router = useRouter();
    useEffect(() => {
        useAuthorized()
            .then((snapshot) => {
                if (snapshot !== true) {
                    router.push('/');
                }
                else {
                    getUser(auth.currentUser.uid)
                        .then((userData) => {
                            setUser(userData);
                        })
                }
            })
    }, []);

    const onSave = async (e, data) => {
        e.preventDefault();

        updateDoc(doc(database, `users/${auth.currentUser.uid}`), {
            ...data
        })
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: data.displayName,
                    photoURL: data.photoURL
                })
            })
        router.push('/');
    }

    if (!user) {
        return (
            <></>
        )
    }
    return (
        <section className="mt-8">
            {/* <button onClick={() => {
                data.map((pizza) => {addDoc(collection(database, `categories/mWTthKNhsL3NVvYNQezh/menu`), {...pizza})
                })
            }}>
                set pizzas
            </button> */}
            <UserTabs isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-5">
                <UserForm user={user} onSave={onSave} />
            </div>
        </section>
    );
}

export default ProfilePage