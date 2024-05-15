'use client'

import axios from "axios";
import { useEffect, useState } from "react"
import toast,{Toaster} from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Link from "next/link";

interface signup {
  email:string,
  password:string
}

function Loginpage() {
  const navigate = useRouter()
  const [user,setUser] = useState<signup>(
    {
      email:'',
      password:""
    }
  )

  const  [buttonDisabled,setButtonDisabled] = useState<boolean>(false);
  const [loading,setLoading] = useState(false);

  const onLogin = async() => {
   try {
    setLoading(true) 
     const response =  await axios.post('/api/users/login',user)
     console.log("login success",response.data);
     navigate.push('/profile')
   } catch (error:any) {
    console.log("login failed");
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
    if(user.email.length > 0 && user.password.length >0)
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
    <h1>{loading ? "Proccessing" : "login"}</h1>
    <hr />
    <label htmlFor="2">Email:</label>
    <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"  type="email" name="email" id="2" value={user.email} onChange={onValueChange} />
    <hr />

    <label htmlFor="3">Password:</label>
    <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="password" name="password" id="3" value={user.password} onChange={onValueChange} />
    <hr />

    <button className="p-2 border border-gray-300 rounded-lg mb-4 focous:outline-none focus:border-gray-600 " onClick={onLogin} disabled={buttonDisabled}>{buttonDisabled ? "No Login" : "Login"}</button>
    <Link href={'/signup'}>Signup page</Link>
   </div>
   </>
  )
}

export default Loginpage