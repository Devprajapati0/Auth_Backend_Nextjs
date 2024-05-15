import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div className='w-screen h-screen tex-center flex justify-center '>
        <div className='text-center'>
            <div>
                <Image src="/juitlogo.png" height="400"
                                        width="400" alt='missing' />
            </div>
        <div className='text-lg text-center font-semibold'>
            An Email has been sent to u check your mail and Verify !
        </div>
        </div>
    </div>
  )
}

export default page