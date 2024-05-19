'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { ObjectId } from 'mongoose'

interface prop
{id:string,username:string}

function Profilepage() {
  const navigate = useRouter()
  const [user ,setUser] = useState<prop>(
    {
      id: '',
      username:''
    }
  );

  const getUserDetails = async()=> {
 try {
  const resp = await axios.post('/api/users/me')
  
  setUser({
   id:resp.data.data._id,
   username:resp.data.data.username
 })} catch (error:any) {
  console.log(error.message)
 }
  } 

  const logout = async()=>{
    
      try {
       await axios.get('/api/users/logout')
      toast.success("sucessuflly logout")
      navigate.push('/login')
        } catch (error:any) {
       console.log(error.message)
      }
        
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl text-blue-300 font-semibold mb-4'>Profile Page</h1>
      <hr />
      
      <h2>{user.id === '' ? "Nothing" : <Link className='font-bold text-pretty text-zinc-200' href={`/profile/${user.id}`}><span className='text-lg font-medium text-lime-500'>Click here:</span>{user.username}</Link>}</h2>
      <hr /><hr />
      <button className='bg-orange-600 mt-4 hover:bg-blue-700 text-slate-200 font-bold py-2 px-4 rounded' onClick={getUserDetails} >Get Details</button>
      <hr /><hr />
      <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout} >Logout</button>
    </div>
  )
}

export default Profilepage
