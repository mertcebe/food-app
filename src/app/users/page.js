"use client";
import UserTabs from '@/components/layout/UserTabs'
import { database } from '@/firebase/firebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const UsersPage = () => {
    let [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        getDocs(query(collection(database, `users`)))
            .then((snapshot) => {
                let allUsers = [];
                snapshot.forEach((user) => {
                    allUsers.push(user.data());
                })
                setUsers(allUsers);
            })
    }

    return (
        <section className='mt-8 max-w-2xl mx-auto'>
            <UserTabs isAdmin={true} />
            <div className='mt-8'>
                {
                    users.map((user) => {
                        return (
                            <div key={user.uid} className='bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4'>
                                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 grow'>
                                    <div className='text-gray-900 font-semibold self-center'>
                                        {user.displayName ? user.displayName : 'No name'}
                                    </div>
                                    <span className='text-gray-500 self-center'>{user.email}</span>
                                    <Link className='button' href={`users/${user.uid}`}>
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default UsersPage