'use client'
import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function Verifypage() {
    const [verified, setVerified] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [disabled,setDisabled] = useState<boolean>(true)
    const getToken = useSearchParams();

    const onVerify = async() => {
        try {
            console.log("getToken",getToken.get('token'))
          const response =  await axios.post('http://localhost:3000/api/users/verifyemail',{token :`${getToken.get('token')}`})
          console.log('response verigy',response)
          setVerified(true)
        } catch (error:any) {
            setError(true)
            console.log("verification failed");
            console.log(error.message);
        }
    }

    useEffect(()=>{
      setError(false)
      if(getToken.get('token')){
        setDisabled(false)
      }
    },[getToken])
    //Another way

    // useEffect(()=>{
    //   const token = window.location.search.split("=")[1]
    //   setToken(urlToken)

    //   //or 

    //   const router = useRouter();
    //   const {querey} = router;
    //  const token query.token
    // })
  return (
    <> <div className="flex flex-col items-center justify-center min-h-screen py-2">

    <h1 className="text-4xl">Verify Email</h1>
    <br /> <br /> 

    <h2 className="p-2  text-white">{disabled ? 'Cannot verify you' : "Click on the button "}</h2>

    <br />
    <button disabled={disabled} className=' text-center flex justify-center p-2 rounded-md bg-red-700' onClick={onVerify} >verify</button>

    <br /> <br />
    {verified && (
        <div>
            <h1 className="text-2xl">Email Verified :</h1>
            <span className="text-2xl">Now Login:</span>
            <Link className='text-center m-8 text-lg text-orange-600' href="/login">
               Login
            </Link>
        </div>
    )}
    {error && (
        <div>
            <h2 className="text-2xl bg-red-500 text-center text-slate-300 ">Error</h2>
            
        </div>
    )}
</div>
   </>
  )
}

export default Verifypage