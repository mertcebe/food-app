import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full flex justify-center items-center'>
        <Image src={'/gifThreads.gif'} width={'600'} height={'400'} alt='loading' />
    </div>
  )
}

export default Loading