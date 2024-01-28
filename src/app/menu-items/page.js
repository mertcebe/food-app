"use client";

import Right from '@/components/icons/Right'
import UserTabs from '@/components/layout/UserTabs'
import React, { useEffect, useState } from 'react'
import { getDatas } from '../menu/page';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, database } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthorized } from '@/auth/authFunctions';
import { getUser } from '@/firebase/firebaseActions';

const MenuItemsPage = () => {
    let [menuItems, setMenuItems] = useState([]);
    let [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        useAuthorized()
            .then((snapshot) => {
                if (snapshot === true) {
                    getUser(auth.currentUser.uid)
                        .then((userData) => {
                            setIsAdmin(userData.admin);
                            if (userData.admin) {
                                fetchCategories();
                            }
                            else{
                                router.push('/profile')
                            }
                        })
                }
                else {
                    router.push('/login');
                }
            })
    }, []);

    const router = useRouter();

    const fetchCategories = async () => {
        let list = [];
        await getDocs(query(collection(database, `categories`), orderBy('name', 'desc')))
            .then((snapshot) => {
                snapshot.forEach(async (category) => {
                    getDatas(category.data().name)
                        .then((datas) => {
                            list.push(...datas);
                        })
                        .then(() => {
                            setMenuItems(list);
                            router.refresh();
                        })
                })
            })
    }

    if (!menuItems || !isAdmin) {
        return (
            <></>
        )
    }
    return (
        <div className='mt-8'>
            <UserTabs isAdmin={isAdmin} />
            <div className='my-4'>
                <button onClick={() => { router.push('menu-items/new') }}>Create new menu item <Right /></button>
                <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-2 my-4'>
                    {
                        menuItems && menuItems.map((item, index) => {
                            return (
                                <Link href={`/menu-items/edit/${item._id}?category=${item.category}`} key={index} className='bg-gray-200 rounded-lg p-4'>
                                    <div className='flex justify-center'>
                                        <Image src={item.img} width={'180'} height={'100'} alt='item' className='rounded-md h-32' />
                                    </div>
                                    <div className="text-center mt-4 font-semibold text-gray-600">
                                        {item.name}
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MenuItemsPage