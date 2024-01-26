"use client";

import Right from '@/components/icons/Right'
import UserTabs from '@/components/layout/UserTabs'
import React, { useEffect, useState } from 'react'
import { getDatas } from '../menu/page';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { database } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';

const MenuItemsPage = () => {
    let [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const router = useRouter();

    const fetchCategories = async () => {
        let list = [];
        let length = 0;
        await getDocs(query(collection(database, `categories`), orderBy('name', 'desc')))
            .then((snapshot) => {
                snapshot.forEach(async (category) => {
                    getDatas(category.data().name)
                        .then((datas) => {
                            length += datas.length;
                            list.push(...datas);
                        })
                        .then(() => {
                            setMenuItems(list);
                            router.refresh();
                        })
                })
            })
    }

    return (
        <div className='mt-8'>
            <UserTabs isAdmin={true} />
            <div className='my-4'>
                <button>Create new menu item <Right /></button>
                <div>
                    {
                        menuItems && menuItems.map((item, index) => {
                            return (
                                <div key={index}>
                                    {item.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MenuItemsPage