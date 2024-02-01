import { auth, database } from '@/firebase/firebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const MenuItem = ({ setBoxControl, ...params }) => {
    const { _id, name, veg, price, description, img, sizes, extraIngredientPrices } = params;

    const router = useRouter();

    const controlFunc = () => {
        if ((sizes && extraIngredientPrices) && (sizes.length > 0 || extraIngredientPrices.length > 0)) {
            setBoxControl(true, params);
        }
        else {
            addToChart(params);
        }
    }
    const productBoxIsOpen = useSelector((state) => {
        return state.menuItemReducers.productBoxIsOpen;
    })
    const dispatch = useDispatch();
    const addToChart = (data) => {
        addDoc(collection(database, `users/${auth.currentUser.uid}/offers`), {
            orderDate: new Date().getTime(),
            productInfo: data,
            price: price
        });
        //! buraya bak
        dispatch({
            type: 'REFRESH',
            payload: {
                isOpen: !productBoxIsOpen
            }
        })
        toast.success('Add to cart successfully!');
    }

    return (
        <div className='bg-gray-200 rounded-md flex flex-col items-center justify-between py-4 relative hover:bg-white transition-all hover:shadow-lg'>
            {veg && <Image src={'/vegan-icon.webp'} width={'22'} height={'22'} alt='vegan-icon' className='absolute right-0 top-0 m-2' title='vegan' />}
            <Image src={img} width={'140'} height={'140'} alt='pizza' className='rounded-lg pointer-events-none' />
            <div className='text-center py-5 px-12'>
                <p className='text-black font-semibold pb-2'>{name}</p>
                <p className='text-gray-600 text-sm font-thin'>{description}</p>
            </div>
            <button className="bg-primary gap-2 w-52 text-white font-thin rounded-full" onClick={controlFunc}>
                Add to chart <span className='font-semibold'>${price}</span>
            </button>
        </div>
    )
}

export default MenuItem