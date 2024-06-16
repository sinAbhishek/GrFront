import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const Blog = (prop) => {
  const url = prop.blogs.image;
  const time = new Date(prop.blogs.time.seconds * 1000);
  const router = useRouter();
  return (
    <Link
      href={{
        pathname: `/blog/${prop.blogs.title}`,
        query: {
          search: `${prop.blogs.title}`,
        },
      }}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        variants={prop.variantname}
        className="marcellus slidermain w-[200px] h-[150px] md:w-[250px] md:h-[200px] flex flex-col justify-between  rounded-sm overflow-hidden  hover:cursor-pointer mx-2 my-2 border border-gray-400 "
      >
        {url && (
          <Image
            className=" "
            src={url}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "150px" }}
            alt="alt"
          />
        )}

        <div className="slidert flex justify-start   p-1 w-full h-[50px]">
          <p className="  text-slate-700 text-sm font-semibold">
            {prop.blogs.title.length > 25
              ? `${prop.blogs.title.slice(0, 25)} ...`
              : prop.blogs.title}
          </p>
        </div>
        {/* <div className=" m-2">
        <h4 className=' font-bold text-slate-900 text-lg'>{prop.blogs.title}</h4>
        <div className=" flex justify-between items-center px-2">
        <h6 className=' text-slate-700 text-sm font-semibold '>{prop.blogs.name}</h6>
        {time&&<h6 className='italic text-xs text-slate-700'>{time.toDateString()}</h6>}
        </div>
        <p className=' text-xs font-medium mt-2'>{prop.blogs.description.substring(0,150)} .....</p>
     
      </div> */}
      </motion.div>
    </Link>
  );
};

export default Blog;
