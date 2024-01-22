"use client";
import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthorized } from "@/auth/authFunctions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [loading, setLoading] = useState(false);
    let [activeUser, setActiveUser] = useState(false);
    const router = useRouter();
    useEffect(() => {
        useAuthorized().then((result) => {
            setActiveUser(result);
            if (result) {
                router.push('/');
            }
        });
    }, []);
    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    setLoading(false);
                    console.log(userCredentials.user);
                })
        }
        else if (!email) {
            document.getElementById('loginEmail').focus();
        }
        else if (!password) {
            document.getElementById('loginPassword').focus();
        }
    }
    return (
        <>
            {
                activeUser &&
                <section className="text-center my-12">
                    <h1 className="font-semibold text-primary text-3xl mt-8 mb-4">Login</h1>
                    <form className="block max-w-xs mx-auto" onSubmit={handleLogin}>
                        <input type="email" placeholder="email" id="loginEmail" onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                        <input type="password" placeholder="password" id="loginPassword" onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                        <button type="submit" disabled={loading}>Login</button>
                        <span className="inline-block my-3 text-gray-500 text-sm">or login with provider</span>
                        <button type="button" className="flex justify-center items-center">
                            <Image src={'/google.png'} width={'20'} height={'20'} alt="google" />
                            Login with Google
                        </button>
                    </form>
                </section>
            }
        </>
    );
}