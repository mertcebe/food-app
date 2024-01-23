"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { useAuthorized } from "@/auth/authFunctions";
import { useRouter } from "next/navigation";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";

const ProfilePage = () => {
    let [user, setUser] = useState();
    const router = useRouter();
    useEffect(() => {
        useAuthorized()
            .then((snapshot) => {
                if (snapshot !== true) {
                    router.push('/');
                }
                else {
                    setUser(auth.currentUser);
                }
            })
    }, []);

    if (!user) {
        return (
            <></>
        )
    }
    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-8">
                <UserForm user={user} onSave={() => {}} />
            </div>
        </section>
    );
}

export default ProfilePage