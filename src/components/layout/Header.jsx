"use client";
import { useAuthorized } from '@/auth/authFunctions';
import { getOffersLength, getUser } from '@/firebase/firebaseActions';
import { auth } from '@/firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Header = () => {
    let [isAuthorized, setIsAuthorized] = useState(false);
    let [user, setUser] = useState(auth.currentUser);
    let [offersLength, setOffersLength] = useState(0);
    const router = useRouter();
    const loc = usePathname();
    const productBoxIsOpen = useSelector((state) => {
        return state.menuItemReducers.productBoxIsOpen;
    })
    useEffect(() => {
        useAuthorized().then((snapshot) => {
            setIsAuthorized(snapshot);
            if (snapshot === true) {
                getUser(auth.currentUser.uid)
                    .then((userInfo) => {
                        setUser(userInfo);
                        getOffersLength(userInfo.uid)
                            .then((offersLength) => {
                                setOffersLength(offersLength);
                            })
                    })
            }
            else {
                setOffersLength(0)
            }
        })
    }, [loc, productBoxIsOpen]);

    return (
        <>
            <header className='flex justify-between md-hidden items-center'>
                <nav className='flex gap-8 text-gray-500 font-semibold items-center'>
                    <Link className='text-primary font-semibold text-2xl' href={'/'}>
                        ST PIZZA
                    </Link>
                    <Link href={'/'} className={loc === '/' && 'active'}>Home</Link>
                    <Link href={'/menu'} className={loc.includes('/menu') && 'active'}>Menu</Link>
                    <Link href={'/about'} className={loc.includes('/about') && 'active'}>About</Link>
                    <Link href={'/contact'} className={loc.includes('/contact') && 'active'}>Contact</Link>
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
                                <Link href={'/profile'} className={`text-gray-500 font-semibold border-none px-4 py-2 ${loc.includes('/profile') ? 'active' : ''}`}>Hello, {user?.displayName ? user?.displayName.split(' ')[0] : 'User'}</Link>
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
                    <Link href={'/cart'} className='rounded-full relative'>
                        <Image src={'/shoppingcart.png'} width={'24'} height={'24'} alt='shoppingcart' className='pointer-events-none' />
                        {
                            offersLength > 0 &&
                            <div className='absolute -top-2 -right-3 bg-primary inline-block w-5 h-5 leading-5 text-center text-xs font-semibold text-white rounded-full'>
                                {offersLength}
                            </div>
                        }
                    </Link>
                </div>
            </header>
        </>
    )
}

export default Header