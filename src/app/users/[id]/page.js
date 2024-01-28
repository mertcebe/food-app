'use client';
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { getUser } from "@/firebase/firebaseActions";
import { database } from "@/firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUserPage({ params }) {
    const { loading, data } = useProfile();
    const [user, setUser] = useState(null);
    const { id } = useParams();

    const router = useRouter();

    useEffect(() => {
        getUser(params.id)
            .then((snapshot) => {
                setUser(snapshot);
            })
    }, []);

    async function handleSaveButtonClick(ev, data) {
        ev.preventDefault();

        updateDoc(doc(database, `users/${user.uid}`), {
            ...data
        })
        router.push('/');
    }

    if (loading) {
        return 'Loading user profile...';
    }

    //   if (!data?.admin) {
    //     return 'Not an admin';
    //   }

    if (!user) {
        return (
            <></>
        )
    }
    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    );
}