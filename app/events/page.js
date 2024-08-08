"use client";

import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { animate, motion, useAnimate, useInView } from "framer-motion";
import { db } from "../firebase";
import Blog from "@/components/Blog";
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
const Events = () => {
  const [data, setdata] = useState([]);
  const mainvariants = {
    hidden: { x: "-100vw" },
    slide: {
      x: 0,
      transition: {
        delay: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.5,
        duration: 0.8,
        type: "easeinout",
        stiffness: 300,
      },
    },
  };
  const itemVariants = {
    hidden: { x: "-300px", opacity: 0, rotate: 0 },
    slide: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: { type: "linear", duration: 0.4, stiffness: 400 },
    },
  };
  useEffect(() => {
    const call = async () => {
      const q = query(collection(db, "users"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const array = [];
        querySnapshot.forEach((doc) => {
          Object.values(doc.data()).forEach((c) => array.push(c));

          // array.push(doc.data());
          console.log({ id: doc.id, ...doc.data() });
        });
        setdata(array);
      });
    };
    call();
  }, []);
  return (
    <section className="sec2 w-screen h-screen flex flex-col justify-center max-[480px]:items-center items-end  p-0 m-0 backdrop-blur-md">
      <div className=" w-[calc(100%-80px)] max-[480px]:w-full   h-full flex justify-center items-center">
        <motion.div className=" overflow-y-scroll blogcont    relative flex  items-center justify-center w-[90%] h-[80%] md:w-[90%] md:h-[80%]  bg-opacity-10 p-2 backdrop-blur-md  ">
          <h2 className=" marcellus text-3xl font-bold text-orange-700 absolute top-0 left-0 w-max  px-2 py-1 rounded-sm ">
            Genshin News
          </h2>
          <motion.div
            variants={mainvariants}
            initial="hidden"
            animate={"slide"}
            className="w-full h-[80%] flex justify-center flex-wrap"
          >
            {data[0] &&
              data.map((c, i) => (
                <Blog variantname={itemVariants} key={i} blogs={c} />
              ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
