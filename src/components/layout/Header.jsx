import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <>
            <header className='flex justify-between md-hidden items-center'>
                <Link className='text-primary font-semibold text-2xl' href={'/'}>
                    ST PIZZA
                </Link>
                <nav className='flex gap-8 text-gray-500 font-semibold items-center'>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/menu'}>Menu</Link>
                    <Link href={'/about'}>About</Link>
                    <Link href={'/contact'}>Contact</Link>
                    <Link href={'/login'} className='bg-primary text-white px-6 py-2 rounded-full'>Login</Link>
                </nav>
            </header>
            <div>

            </div>
        </>
    )
}

export default Header