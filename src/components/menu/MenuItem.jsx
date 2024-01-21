import Image from 'next/image';
import React from 'react'

const MenuItem = ({...params}) => {
    const {id, name, veg, price, description, img, sizeandcrust} = params;
    return (
        <>
            <Image src={img} width={'160'} height={'160'} alt='pizza' />
        </>
    )
}

export default MenuItem