import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Blog = (prop) => {
const url=prop.blogs.image
const time=new Date(prop.blogs.time.seconds*1000)
const router=useRouter()
  return (
    <Link   href={{
      pathname: `/blog/${prop.blogs.title}`,
      query: {
        search:`${prop.blogs.title}`
      }
    }}>
    
    <div    className=" slidermain w-auto h-[250px] hover:scale-105 transition  rounded-xl overflow-hidden duration-300 hover:cursor-pointer mx-2 border border-gray-400 ">
      <div className=" sliderimg w-full h-[200px] relative  ">
      {url&&<Image className=' ' src={url} fill
 alt='alt' style={{borderRadius:"0 0 30px 0",borderBottom:"2px solid #fc0f23"}} />}
      </div>
      <div className=" flex justify-center p-1">
        <p className=' slidert text-slate-100 text-sm'>{prop.blogs.title.length>25?`${prop.blogs.title.slice(0,25)} ...`:prop.blogs.title}</p>
      </div>
      {/* <div className=" m-2">
        <h4 className=' font-bold text-slate-900 text-lg'>{prop.blogs.title}</h4>
        <div className=" flex justify-between items-center px-2">
        <h6 className=' text-slate-700 text-sm font-semibold '>{prop.blogs.name}</h6>
        {time&&<h6 className='italic text-xs text-slate-700'>{time.toDateString()}</h6>}
        </div>
        <p className=' text-xs font-medium mt-2'>{prop.blogs.description.substring(0,150)} .....</p>
     
      </div> */}
     
    </div>
    </Link>
  )
}

export default Blog