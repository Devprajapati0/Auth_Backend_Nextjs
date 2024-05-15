'use client'

import axios from "axios";
import { useEffect, useState } from "react"
import toast,{Toaster} from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Link from "next/link";

interface signup {
  username:string,
  email:string,
  password:string
}

function Signuppage() {
  const navigate = useRouter()
  const [user,setUser] = useState<signup>(
    {
      username:'',
      email:'',
      password:""
    }
  )

  const  [buttonDisabled,setButtonDisabled] = useState<boolean>(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');

  

  const onSignup = async() => {
   try {
    setLoading(true) 
     const response =  await axios.post('/api/users/signup',user)
     console.log("Signup success",response.data.message);
     setError(response.data.message)
     navigate.push('/redirectpage')
   } catch (error:any) {
    console.log("signup failed");
    toast.error(error.message,{
      duration: 4000,
       position: 'top-center',
    })
   }
   finally {
    setLoading(false);
}
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length >0 && user.username.length >0 )
      setButtonDisabled(false)

    else
    setButtonDisabled(true)
  },[user])


  const onValueChange =(e:React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev)=>(
      {
        ...prev,
        [e.target.name] : e.target.value
      }
    ))
  }

  return (
   <>
   <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{loading ? "Proccessing" : "Signup"}</h1>
    <hr />
    {error && <h3>{error}</h3>}
    <label htmlFor="1">Username:</label>
    <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="text" name="username" id="1" value={user.username} onChange={onValueChange} />
    <hr />

    <label htmlFor="2">Email:</label>
    <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"  type="email" name="email" id="2" value={user.email} onChange={onValueChange} />
    <hr />

    <label htmlFor="3">Password:</label>
    <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="password" name="password" id="3" value={user.password} onChange={onValueChange} />
    <hr />

    <button className="p-2 border border-gray-300 rounded-lg mb-4 focous:outline-none focus:border-gray-600 " onClick={onSignup} disabled={buttonDisabled}>{buttonDisabled ? "No signup" : "Signup"}</button>
    <Link href={'/login'}>Login page</Link>
   </div>
   </>
  )
}

export default Signuppage