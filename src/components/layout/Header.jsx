"use client";
import { useAuthorized } from '@/auth/authFunctions';
import { getUser } from '@/firebase/firebaseActions';
import { auth } from '@/firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Header = () => {
    let [isAuthorized, setIsAuthorized] = useState(true);
    let [user, setUser] = useState(auth.currentUser);
    const router = useRouter();
    const loc = usePathname();
    useEffect(() => {
        useAuthorized().then((snapshot) => {
            if (snapshot === true) {
                getUser(auth.currentUser.uid)
                    .then((userInfo) => {
                        setUser(userInfo);
                        setIsAuthorized(snapshot);
                    })
            }
        })
    }, [loc]);

    return (
        <>
            <header className='flex justify-between md-hidden items-center'>
                <nav className='flex gap-8 text-gray-500 font-semibold items-center'>
                    <Link className='text-primary font-semibold text-2xl' href={'/'}>
                        ST PIZZA
                    </Link>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/menu'}>Menu</Link>
                    <Link href={'/about'}>About</Link>
                    <Link href={'/contact'}>Contact</Link>
                </nav>

                <div className='flex items-center gap-4'>
                    {
                        !isAuthorized ?
                            <nav>
                                <Link href={'/login'} className='text-gray-500 font-semibold px-6 py-2 rounded-full'>Login</Link>
                                <Link href={'/register'} className='bg-primary text-white px-6 py-2 rounded-full'>Register</Link>
                            </nav>
                            :
                            <div className='flex gap-2 items-center'>
                                <Link href={'/profile'} className='text-gray-500 font-semibold border-none px-4 py-2'>Hello, {user?.displayName ? user?.displayName.split(' ')[0] : 'User'}</Link>
                                <button
                                    onClick={() => {
                                        signOut(auth);
                                        setIsAuthorized(false);
                                        router.push('/login');
                                    }}
                                    style={{ width: "140px" }}
                                    className='bg-primary text-white px-6 py-2 rounded-full'>
                                    Logout
                                </button>
                            </div>
                    }
                    <Link href={'/cart'} className='rounded-full'>
                        <Image src={'/shoppingcart.png'} width={'24'} height={'24'} alt='shoppingcart' className='pointer-events-none' />
                    </Link>
                </div>
            </header>
        </>
    )
}

export default Header