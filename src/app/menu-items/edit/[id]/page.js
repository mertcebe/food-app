"use client";
import DeleteButton from '@/components/DeleteButton'
import MenuItemForm from '@/components/layout/MenuItemForm';
import UserTabs from '@/components/layout/UserTabs'
import { database } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditDetailsPage = ({ params, searchParams }) => {
    let [menuItem, setMenuItem] = useState();

    const router = useRouter();
    useEffect(() => {
        getDoc(doc(database, `menu/categories/${searchParams.category}/${params.id}`))
        .then((snapshot) => {
            setMenuItem({
                _id: snapshot.id,
                category: searchParams.category,
                ...snapshot.data()
            });
        })
    }, []);
    const handleFormSubmit = async (e, data) => {
        e.preventDefault();
    }

    const handleDeleteClick = () => {

    }

    if(!menuItem){
        return (
            <></>
        )
    }
    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    {/* <Left /> */}
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
            <div className="max-w-md mx-auto mt-2">
                <div className="max-w-xs ml-auto pl-4">
                    <DeleteButton
                        label="Delete this menu item"
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>
        </section>
    )
}

export default EditDetailsPage