import Image from 'next/image'
import React from 'react'
import Right from '../icons/Right'

const Hero = () => {
    return (
        <section className='hero md:mt-4 mb-6'>
            <div className='py-8 md:py-12'>
                <h2 className='text-4xl font-semibold'>
                    Everthing<br />
                    is better<br />
                    with a&nbsp;
                    <span className='text-primary'>Pizza</span>
                </h2>
                <p className='text-gray-500 text-sm my-6'>
                    Pizza is the missing piece that makes every day<br />
                    complete, a simple yet delicious joy in life
                </p>
                <div className='flex text-sm gap-4'>
                    <button className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 font-semibold rounded-full">
                        Order now
                        <Right className='w-5 h-5' />
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 py-2 font-semibold border-0">
                        Learn More
                        <Right className='w-5 h-5' />
                    </button>
                </div>
            </div>

            <div className="relative hidden md:block">
                <Image src='/pizza.png' width={'400'} height={'300'} objectFit={'contain'} alt={'pizza'} />
            </div>
        </section>
    )
}

export default Hero