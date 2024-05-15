'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'




interface prop { username: string,email:string }
function Dynamicpage({params}:any) {

    const [user, setUser] = useState<prop>(
        {
     
            username: '',
            email:''
        }
    );

    useEffect(()=>{
        try {
               axios.post('/api/users/me').then((resp)=>{
                setUser({
                   
                    username:resp.data.data.username,
                    email:resp.data.data.email
                  })
               })
            
         } catch (error:any) {
            console.log(error.message)
           }
    },[])

    return (
        <>

        <div >
            <div className='font-bold text-center mt-4 text-3xl' >Details:</div>
            <div><h2 className='text-center'> id: {params.id}</h2></div> {/* //params.foldername */}
            <div className='text-center mt-8 text-xl'>
               <span className='font-semibold text-2xl text-orange-500'>Name:</span>{user.username}<br/> 
               <span className='font-semibold text-2xl text-orange-500'>Email:</span>{user.email}<br/> 

            </div>
        </div>
           </>
    )
}

export default Dynamicpage