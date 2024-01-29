"use client";

import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItem from '@/components/menu/MenuItem';
import { database } from '@/firebase/firebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Image from 'next/image';
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
    const [chooseSize, setChooseSize] = useState(null);
    const [chooseExtras, setChooseExtras] = useState(null);

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
        setChooseSize(null);
        setBoxData(data);
        setIsOpen(opt);
    }

    return (
        <div className='my-4'>
            {
                isOpen &&
                <div className='fixed w-full h-screen top-0 left-0 flex justify-center items-center backdrop-blur-none backdrop-brightness-75 z-20 overflow-auto'>
                    <div className='relative bg-white p-3 rounded-md text-center w-96'>
                        {/* details page of {boxData._id} */}
                        <Image src={boxData.img} width={'320'} height={'320'} alt='itemImage' className='mx-auto max-h-60' />
                        <div className='text-gray-700 font-bold text-lg'>{boxData.name}</div>
                        <div className='text-gray-400 text-sm'>
                            {boxData.description}
                        </div>
                        <div>
                            <p className='p-0 m-0 font-semibold text-sm text-gray-600'>Pick your size</p>
                            <form>
                                {
                                    boxData.sizes.map((size, index) => {
                                        return (
                                            <div className='flex items-center w-full px-1 text-left rounded-md border border-gray-200 mb-2'>
                                                <input type="radio" name="size" id={`size${index}`} onChange={(e) => {
                                                    setChooseSize(size);
                                                }} />
                                                <label htmlFor={`size${index}`} className='font-bold ml-2 py-2 uppercase text-gray-500 inline-block w-full cursor-pointer'>{size.name}<span className='ml-2 text-gray-700'>${size.price}</span></label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>
                        <div>
                            <p className='p-0 m-0 font-semibold text-sm text-gray-600'>Any extras?</p>
                            <form>
                                {
                                    boxData.extraIngredientPrices.map((extra, index) => {
                                        return (
                                            <div className='flex items-center w-full px-1 text-left rounded-md border border-gray-200 mb-2'>
                                                <input type="checkbox" name="extra" id={`extra${index}`} />
                                                <label htmlFor={`extra${index}`} className='font-bold ml-2 py-2 uppercase text-gray-500 inline-block w-full cursor-pointer'>{extra.name}<span className='ml-2 text-gray-700'>${extra.price}</span></label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>
                        <button onClick={() => {
                            setIsOpen(false);
                            setBoxData(null);
                        }} className='absolute right-1 top-1 w-12 backdrop-blur-sm'>x</button>
                        <button>Add to chart ${Number(boxData.price) + Number(chooseSize ? chooseSize.price : 0)}</button>
                    </div>
                </div>
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