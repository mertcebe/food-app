import React from 'react'

const SectionHeaders = ({ subHeader, mainHeader }) => {
    return (
        <>
            <h3 className='text-xl font-bold text-gray-500 leading-4'>
                {subHeader}
            </h3>
            <h2 className='text-4xl font-extrabold text-primary italic'>
                {mainHeader}
            </h2>
        </>
    )
}

export default SectionHeaders