"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoGameControllerOutline } from "react-icons/io5";
import { FaNewspaper } from "react-icons/fa";
import { MdRedeem } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { useAnimate, stagger, motion } from "framer-motion";
const SideNavbar = () => {
  const router = useRouter();
  const mainvariants = {
    hidden: { x: "-100vw" },
    slide: {
      x: 0,
      transition: {
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.5,
        duration: 0.8,
        type: "easeinout",
        stiffness: 300,
      },
    },
  };
  const itemVariants = {
    hidden: { x: "-100px", opacity: 0, rotate: 0 },
    slide: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: { type: "linear", duration: 0.4, stiffness: 400 },
    },
  };
  return (
    <motion.div
      variants={mainvariants}
      initial="hidden"
      animate="slide"
      className=" max-[480px]:hidden bg-[#020208]  w-[80px] h-screen absolute flex flex-col justify-center items-center gap-4 left-0 top-0 bottom-0 z-10"
    >
      <img
        className=" absolute top-4 w-[50px] h-[50px] "
        src="./hoyologo.png"
        alt=""
      />
      <motion.button
        onClick={() => router.push("/")}
        variants={itemVariants}
        className=" w-max text-slate-400"
      >
        <FaHome size={"2rem"} />
      </motion.button>
      <motion.button
        onClick={() => router.push("/randomiser")}
        variants={itemVariants}
        className=" w-max  text-slate-400"
      >
        <IoGameControllerOutline size={"2rem"} />
      </motion.button>
      <motion.button
        onClick={() => router.push("/events")}
        variants={itemVariants}
        className=" w-max  text-slate-400"
      >
        <FaNewspaper size={"2rem"} />
      </motion.button>
      <motion.button
        onClick={() => router.push("/characters")}
        variants={itemVariants}
        className="  w-max  text-slate-400"
      >
        <FaUserGroup size={"2rem"} />
      </motion.button>
    </motion.div>
  );
};

export default SideNavbar;
