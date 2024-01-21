import Image from 'next/image';
import React from 'react'

const MenuItem = ({ ...params }) => {
    const { id, name, veg, price, description, img, sizeandcrust } = params;
    return (
        <div className='bg-gray-200 rounded-md flex flex-col items-center justify-between py-4 relative hover:bg-white transition-all hover:shadow-lg'>
            {veg&&<Image src={'/vegan-icon.webp'} width={'22'} height={'22'} alt='vegan-icon' className='absolute right-0 top-0 m-2' title='vegan' />}
            <Image src={img} width={'140'} height={'140'} alt='pizza' className='rounded-lg pointer-events-none' />
            <div className='text-center py-5 px-12'>
                <p className='text-black font-semibold pb-2'>{name}</p>
                <p className='text-gray-600 text-sm font-thin'>{description}</p>
            </div>
            <button className="bg-primary gap-2 w-52 text-white font-thin rounded-full">
                Add to chart ${price}
            </button>
        </div>
    )
}

export default MenuItem