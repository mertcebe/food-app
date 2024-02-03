import { useAuthorized } from '@/auth/authFunctions';
import { auth, database } from '@/firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const CartProduct = ({ initialBoxData, setIsOpen, setMouseCoor }) => {
    const [boxData, setBoxData] = useState(initialBoxData);
    const [chooseSize, setChooseSize] = useState(null);
    const [chooseExtras, setChooseExtras] = useState([]);
    const [totalExtrasPrice, setTotalExtrasPrice] = useState(0);

    const router = useRouter();

    useEffect(() => {
        let allCost = 0;
        chooseExtras.forEach((item) => {
            allCost += Number(item.price);
        });
        setTotalExtrasPrice(allCost);
    }, [chooseExtras.length]);

    const closeCartProduct = () => {
        setIsOpen(false);
        setBoxData(null);
        setChooseSize(null);
        setChooseExtras([]);
        setTotalExtrasPrice(0);
    }

    const productBoxIsOpen = useSelector((state) => {
        return state.menuItemReducers.productBoxIsOpen;
    })
    const dispatch = useDispatch();

    const addToCart = () => {
        useAuthorized()
            .then((snapshot) => {
                if (snapshot) {
                    addDoc(collection(database, `users/${auth.currentUser.uid}/offers`), {
                        price: (Number(boxData.price) + totalExtrasPrice + Number(chooseSize ? chooseSize.price : 0)),
                        sizes: chooseSize,
                        extras: chooseExtras,
                        orderDate: new Date().getTime(),
                        productInfo: boxData
                    })
                        .then(() => {
                            setIsOpen(false);
                            dispatch({
                                type: 'REFRESH',
                                payload: {
                                    isOpen: !productBoxIsOpen
                                }
                            })
                            toast.success('Add to cart successfully!');
                        })
                }
                else {
                    alert('Login if you want to order!');
                }
            })
    }

    return (
        <div className='fixed w-full h-screen top-0 left-0 flex justify-center items-center backdrop-blur-none backdrop-brightness-75 z-20 overflow-auto'>
            <div className='relative bg-white p-3 rounded-md text-center w-96'>
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
                    <button
                        onClick={() => {
                            boxData.sizes.forEach((size, index) => {
                                document.getElementById(`size${index}`).checked = false
                            });
                            setChooseSize(null);
                        }}
                        className='mb-4 py-1 text-sm bg-gray-200 hover:bg-gray-300'
                    >
                        Clear choices
                    </button>
                </div>
                <div>
                    <p className='p-0 m-0 font-semibold text-sm text-gray-600'>Any extras?</p>
                    <form>
                        {
                            boxData.extraIngredientPrices.map((extra, index) => {
                                return (
                                    <div className='flex items-center w-full px-1 text-left rounded-md border border-gray-200 mb-2'>
                                        <input type="checkbox" name="extra" id={`extra${index}`} onChange={(e) => {
                                            if (e.target.checked) {
                                                setChooseExtras([...chooseExtras, extra]);
                                            }
                                            else {
                                                const list = chooseExtras.filter((item) => item.name !== extra.name);
                                                setChooseExtras(list);
                                            }
                                        }} />
                                        <label htmlFor={`extra${index}`} className='font-bold ml-2 py-2 uppercase text-gray-500 inline-block w-full cursor-pointer'>{extra.name}<span className='ml-2 text-gray-700'>${extra.price}</span></label>
                                    </div>
                                )
                            })
                        }
                    </form>
                </div>
                <button onClick={closeCartProduct} className='absolute right-1 top-1 w-12 backdrop-blur-sm'>x</button>
                <button
                    className='bg-primary text-white'
                    onClick={(e) => {
                        addToCart();
                        if(setMouseCoor){
                            setMouseCoor(e);
                        }
                    }}
                >
                    Add to chart ${Number(boxData.price) + Number(chooseSize ? chooseSize.price : 0) + totalExtrasPrice}
                </button>
            </div>
        </div>
    )
}

export default CartProduct