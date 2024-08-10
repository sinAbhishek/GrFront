"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { AuthContext } from "@/components/state";

const Page = () => {
  const { Socket, dispatch, rooms, joinedroom, err, name } =
    useContext(AuthContext);
  useEffect(() => {
    if (joinedroom !== null) {
      Socket &&
        Socket.emit("leaveroom", { data: "meow" }, (err) => {
          console.log(err);
        });
    }
    dispatch({ type: "JoinedRoom", payload: null });
  }, []);
  return (
    <>
      <AnimatePresence>
        <div
          onLoad={() => console.log("he")}
          className=" w-screen h-screen  bg-cover  bg-[url('../public/yaemiko.jpg')]  bg-center relative "
        >
          <div className="absolute top-0 bottom-0 left-0 right-0 boxshadow  "></div>
          <div className=" max-[480px]:min-w-[100%] max-[480px]:pl-0 pl-[80px] max-[650px]:min-w-[500px] min-w-[700px]  w-[60%] h-full flex flex-col  justify-center items-center ">
            <motion.img
              initial={{ scale: 6, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { delay: 0.1, duration: 0.7 },
              }}
              exit={{ scale: 6, opacity: 0 }}
              className=" z-20 w-[260px] h-[120px]"
              src="./genshinimpact.png"
              alt=""
            />
            <motion.h2
              initial={{ x: "-100px", opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { delay: 0.3, duration: 0.7 },
              }}
              className="alicehead max-[480px]:text-3xl max-[900px]:text-4xl   text-5xl font-semibold text-white z-20"
            >
              EXPERIENCE SEVEN
            </motion.h2>
            <motion.h4
              initial={{ x: "100px", opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { delay: 0.3, duration: 0.7 },
              }}
              className=" alicehead max-[480px]:text-base text-lg md:text-xl font-semibold text-white z-20"
            >
              NATIONS TEEMING WITH LIFE
            </motion.h4>
          </div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default Page;
