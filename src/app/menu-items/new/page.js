"use client";
import Left from '@/components/icons/Left'
import MenuItemForm from '@/components/layout/MenuItemForm'
import UserTabs from '@/components/layout/UserTabs'
import { setMenuItemToFirebase } from '@/firebase/firebaseActions';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

const NewMenuItemPage = () => {
    const router = useRouter();

    const handleFormSubmit = (e, data) => {
        e.preventDefault();
        setMenuItemToFirebase(data.category, data)
        .then(() => {
            router.push('/menu-items');
        })
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
        </section>
    )
}

export default NewMenuItemPage