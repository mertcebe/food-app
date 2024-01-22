import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <>
            <header className='flex justify-between md-hidden items-center'>
                <nav className='flex gap-8 text-gray-500 font-semibold items-center'>
                    <Link className='text-primary font-semibold text-2xl' href={'/'}>
                        ST PIZZA
                    </Link>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/menu'}>Menu</Link>
                    <Link href={'/about'}>About</Link>
                    <Link href={'/contact'}>Contact</Link>
                </nav>

                <nav>
                    <Link href={'/login'} className='text-gray-500 font-semibold px-6 py-2 rounded-full'>Login</Link>
                    <Link href={'/register'} className='bg-primary text-white px-6 py-2 rounded-full'>Register</Link>
                </nav>
            </header>
        </>
    )
}

export default Header