"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, setDoc, updateDoc,collection,getDocs,onSnapshot,query,deleteField } from "firebase/firestore"; 
import { db } from '../../firebase';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { auth } from '../../firebase';

function Page({searchParams}) {
  const router=useRouter()
  const [time,settime]=useState("")
  const [data,setdata]=useState("")
  const [open,setopen]=useState(false)
  const [active,setactive]=useState(false)
  const handleClose = () => setopen(false);
  const user=auth.currentUser?.uid;
  const [filter,setfilter]=useState([])
  useEffect(()=>{

    const call=async ()=>{
      const q = query(collection(db, "users"))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const array=[]
        querySnapshot.forEach((doc) => {
          Object.values(doc.data()).forEach((c)=>array.push(c))
      
    
            console.log({id:doc.id,...doc.data()});
        });
        setdata(array)
      });

    };
      
      
  
    call();

  },[])
  useEffect(()=>{
    const call=()=>{
      if(user===filter[0].userid){
        setactive(true)
      }
      else{
        setactive(false)
      }
    }
filter[0]&&call()
   
  },[user,filter])
  useEffect(()=>{
    const call=()=>{
      const result = data.filter((c) =>
      searchParams.search.toLowerCase() ===
      c.title.slice(0, searchParams.search.length).toLocaleLowerCase())
      settime(new Date(result[0]?.time.seconds*1000))
  setfilter(result)
  console.log(result)
    }
    data&&call()
 
  },[data])
  const remove=async()=>{
    const Ref = doc(db, 'users', filter[0].userid);


await updateDoc(Ref, {
    [filter[0].blogid]: deleteField()
});
router.push("/")
  }
  return (
    <div className='w-screen flex justify-center bg-slate-900'>
    
      {filter[0]&&<div className=" w-8/12 h-max flex flex-col mt-8 text-white">
        <div className="w-full flex justify-center">
        <h1 className='kanit   text-3xl text-slate-100'>{filter[0].title}</h1>
        </div>
        
        <div className=" flex justify-between items-center px-2">
          <div className="">
          <h6 className=' text-slate-100 text-md font-semibold '>{filter[0].name}</h6>
        {time&&<h6 className='italic text-sm text-slate-100'>{time.toDateString()}</h6>}
          </div>
     {active&&<div className="">
      <button onClick={()=>setopen(!open)} className=' bg-red-300 mr-2'><EditIcon /></button>
      <button onClick={()=>remove()} className=' bg-red-500'><DeleteIcon/></button>
     </div>}
        </div>
        <div className="w-full h-[500px] relative rounded-lg mt-4 flex justify-center">
        <div className=" w-full h-full">
          <img className=' w-full h-full' src={filter[0].image} alt="" />
        {/* <Image src={filter[0].image} width={600} height={200}  alt='alt' style={{borderRadius:"8px 8px 0 0"}} /> */}
        </div>

  
      </div>
      <p className='crimson mt-12'>{filter[0].description}</p>
      </div>}

    </div>
  )
}

export default Page