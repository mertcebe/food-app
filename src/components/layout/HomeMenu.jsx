"use client";
import React, { useEffect, useState } from 'react'
import SectionHeaders from './SectionHeaders';
import MenuItem from '../menu/MenuItem';
import data from '../../data/data.json';

const getPizzas = async (num) => {
    let url = `https://pizza-and-desserts.p.rapidapi.com/pizzas`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '588fcf9436mshc1af2c1f8b94917p192dfajsnefdeaaa65e3a',
            'X-RapidAPI-Host': 'pizza-and-desserts.p.rapidapi.com'
        }
    };

    try {
        // const response = await fetch(url, options);
        // const result = await response.text();
        if (typeof num === 'number') {
            return data[num - 1];
        }
        return data;
    } catch (error) {
        console.error(error);
    }
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