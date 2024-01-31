"use client";

import SectionHeaders from '@/components/layout/SectionHeaders';
import CartProduct from '@/components/menu/CartProduct';
import MenuItem from '@/components/menu/MenuItem';
import { database } from '@/firebase/firebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

export const getDatas = async (type) => {
    let list = [];
    return await new Promise((resolve) => {
        getDocs(query(collection(database, `menu/categories/${type}`)))
            .then((snapshot) => {
                snapshot.forEach((item) => {
                    list.push({
                        _id: item.id,
                        category: type,
                        ...item.data()
                    });
                })
                resolve(list);
            })
    })
}

const MenuPage = () => {
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    // details box
    const [boxData, setBoxData] = useState(null);

    useEffect(() => {
        fetchCategories()
    }, []);

    const fetchCategories = async () => {
        let list = [];
        await getDocs(query(collection(database, `categories`), orderBy('name', 'desc')))
            .then((snapshot) => {
                snapshot.forEach(async (category) => {
                    getDatas(category.data().name)
                        .then((datas) => {
                            list.push({
                                _id: category.id,
                                menu: datas,
                                ...category.data()
                            });
                        })
                        .then(() => {
                            if (snapshot.size == list.length) {
                                setCategories(list);
                            }
                        })
                })
            })
    }

    const setBoxControl = (opt, data) => {
        setBoxData(data);
        setIsOpen(opt);
    }

    return (
        <div className='my-4'>
            {
                isOpen &&
                <CartProduct initialBoxData={boxData} setIsOpen={setIsOpen} />
            }
            {
                categories?.map((category) => {
                    return (
                        <div key={category._id}>
                            <SectionHeaders mainHeader={`${category.name}`.toUpperCase()} />
                            <div className='my-3 grid lg:grid-cols-3 sm:grid-cols-2 gap-4'>
                                {
                                    category.menu.length !== 0 ?
                                        category.menu.map((item, index) => {
                                            return (
                                                <MenuItem key={index} {...item} setBoxControl={setBoxControl} />
                                            )
                                        })
                                        :
                                        <p className='text-sm text-gray-400 pointer-events-none'>
                                            <i>There are no food entries for category named '{category.name}' yet!</i>
                                        </p>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MenuPage