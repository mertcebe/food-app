"use client";
import React, { useEffect, useState } from 'react'
import SectionHeaders from './SectionHeaders';
import MenuItem from '../menu/MenuItem';
import data from '../../data/data.json';
import { collection, getDocs, query } from 'firebase/firestore';
import { database } from '@/firebase/firebaseConfig';

const getPizzas = async (num) => {
    return new Promise((resolve) => {
        try {
            getDocs(query(collection(database, `menu/categories/pizza`)))
                .then((snapshot) => {
                    const data = [];
                    snapshot.forEach((i) => {
                        data.push({
                            id: i.id,
                            ...i.data()
                        });
                    });
                    if (typeof num === 'number') {
                        resolve(data[num - 1]);
                    }
                    resolve(data);
                })
        } catch (error) {
            console.error(error);
        }
    })
}

const HomeMenu = () => {
    let [bestSeller, setBestSeller] = useState([]);
    useEffect(() => {
        getPizzas()
            .then((snapshot) => {
                setBestSeller(snapshot.slice(0, 3))
            })
    }, []);
    return (
        <>
            <div className="text-center mb-4">
                <SectionHeaders
                    subHeader={'Check Out'}
                    mainHeader={'Our Best Sellers'}
                />
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
                {
                    bestSeller.length > 0 &&
                    bestSeller.map((item) => {
                        return (
                            <MenuItem key={item.id} {...item} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default HomeMenu