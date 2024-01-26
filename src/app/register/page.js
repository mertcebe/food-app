"use client";
import { useAuthorized } from "@/auth/authFunctions";
import { setDataToFirebase } from "@/firebase/firebaseActions";
import { auth } from "@/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterPage() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [createUserLoading, setCreateUserLoading] = useState(false);
    let [isAuthorized, setIsAuthorized] = useState(false);

    const router = useRouter();

    useEffect(() => {
        useAuthorized()
        .then((snapshot) => {
            setIsAuthorized(snapshot);
            if(snapshot)
                router.push('/');
        })
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();
        if (email && password) {
            setCreateUserLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    const userInfo = {
                        displayName: userCredentials.user.displayName,
                        email: userCredentials.user.email,
                        uid: userCredentials.user.uid,
                        photoURL: userCredentials.user.photoURL,
                        phoneNumber: userCredentials.user.phoneNumber
                    }
                    setDataToFirebase(`users/${userCredentials.user.uid}`, userInfo);
                    setCreateUserLoading(false);
                })
        }
        else if (!email) {
            document.getElementById('registerEmail').focus();
        }
        else if (!password) {
            document.getElementById('registerPassword').focus();
        }
    }

    if(isAuthorized){
        return (
            <></>
        )
    }
    return (
        <>
            <section className="text-center my-12">
                <h1 className="font-semibold text-primary text-3xl mt-8 mb-4">Register</h1>
                <form className="block max-w-xs mx-auto" onSubmit={handleRegister}>
                    <input type="email" placeholder="email" id="registerEmail" onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <input type="password" placeholder="password" id="registerPassword" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <button type="submit" disabled={createUserLoading}>Register</button>
                    <span className="inline-block my-3 text-gray-500 text-sm">or login with provider</span>
                    <button type="button" className="flex justify-center items-center">
                        <Image src={'/google.png'} width={'20'} height={'20'} alt="google" />
                        Login with Google
                    </button>
                    <div className="text-center my-4 text-gray-500 border-t pt-4">
                        Existing account?&nbsp;
                        <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                    </div>
                </form>

                <button onClick={() => {
                    signOut(auth);
                }}>sign out</button>
            </section>
        </>
    );
}
