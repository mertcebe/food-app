"use client";

import { useAuthorized } from '@/auth/authFunctions';
import AddressInputs from '@/components/layout/AddressInputs'
import SectionHeaders from '@/components/layout/SectionHeaders'
import CartContainer from '@/components/menu/CartContainer';
import CartProduct from '@/components/menu/CartProduct';
import { auth, database } from '@/firebase/firebaseConfig';
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const CartPage = ({ searchParams }) => {
    let [cartProducts, setCartProducts] = useState([]);
    let [subTotal, setSubTotal] = useState(null);
    let [loading, setLoading] = useState(false);
    let [phone, setPhone] = useState('');
    let [streetAddress, setStreetAddress] = useState('');
    let [postalCode, setPostalCode] = useState('');
    let [city, setCity] = useState('');
    let [country, setCountry] = useState('');

    useEffect(() => {
        useAuthorized()
            .then((snapshot) => {
                if (snapshot) {
                    getUserAddressInfo();
                    getOffers();
                }
            })
    }, []);

    const getOffers = async () => {
        await getDocs(query(collection(database, `/users/${auth?.currentUser?.uid}/offers`), orderBy('orderDate', 'asc')))
            .then((snapshot) => {
                let offerList = [];
                let totalCost = 0;
                snapshot.forEach((offer) => {
                    totalCost += offer.data().price;
                    offerList.push({
                        ...offer.data(),
                        id: offer.id
                    });
                })
                setCartProducts(offerList);
                setSubTotal(totalCost);
            })
    }

    const getUserAddressInfo = () => {
        getDoc(doc(database, `/users/${auth?.currentUser?.uid}`))
            .then((snapshot) => {
                const { country, phoneNumber: phone, postalCode, streetAddress, city } = snapshot.data();
                setCity(city);
                setCountry(country);
                setPhone(phone);
                setPostalCode(postalCode);
                setStreetAddress(streetAddress);
            })
    }

    const proceedToCheckout = (e) => {
        e.preventDefault();
        console.log({
            address: {
                country, city, phone, streetAddress, postalCode
            },
            offers: [
                ...cartProducts
            ],
            subTotal: subTotal
        })
    }

    const handleAddressChange = (type, value) => {
        if (type === 'phone') setPhone(value);
        if (type === 'streetAddress') setStreetAddress(value);
        if (type === 'postalCode') setPostalCode(value);
        if (type === 'city') setCity(value);
        if (type === 'country') setCountry(value);
    }

    const removeCartProduct = (id) => {
        setLoading(true);
        deleteDoc(doc(database, `/users/${auth.currentUser.uid}/offers/${id}`))
            .then(async () => {
                await getOffers();
                setLoading(false);
            })
    }

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart" />
            </div>
            <div className="mt-8 grid gap-8 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div className='italic text-gray-700'>No products in your shopping cart</div>
                    )}
                    {loading && (
                        <div>Please wait...</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <>
                            <CartContainer
                                key={index}
                                product={product}
                                onRemove={removeCartProduct}
                                disabled={loading}
                            />
                        </>
                    ))}
                    {
                        cartProducts?.length > 0 &&
                        <div className="py-2 pr-16 flex justify-end items-center">
                            <div className="text-gray-500">
                                Subtotal:<br />
                                Delivery:<br />
                                Total:
                            </div>
                            <div className="font-semibold pl-2 text-right">
                                ${subTotal}<br />
                                $5<br />
                                ${subTotal + 5}
                            </div>
                        </div>
                    }
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs
                            addressProps={{ city, country, streetAddress, phone, postalCode }}
                            setAddressProp={handleAddressChange}
                        />
                        <button type="submit" disabled={loading}>Pay ${subTotal + 5}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CartPage