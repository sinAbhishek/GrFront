"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  delay,
  useAnimate,
  usePresence,
  stagger,
  useTransform,
  useInView,
} from "framer-motion";
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import Blog from "./Blog";
import zIndex from "@mui/material/styles/zIndex";
const Lobby = ({ blogs, setslideshow, openmodal }) => {
  const ref = useRef(null);
  const { scrollY, scrollYProgress } = useScroll();
  const [scopecont, animatecont] = useAnimate();
  const [scope, animate] = useAnimate();
  const [scopesec, animatesec] = useAnimate();
  const [state, setstate] = useState(false);
  const [stest, setstest] = useState(false);
  const isInView = useInView(ref, { amount: 0.2 });
  const move1 = useTransform(scrollYProgress, [0, 1], ["100%", "-50%"]);
  const move2 = useTransform(scrollYProgress, [0, 1], ["100%", "-50%"]);
  const [width, setWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );
  const [shrink, setshrink] = useState(false);
  const [open, setopen] = useState(false);
  useEffect(() => {
    const handleResize = (value) => {
      setWidth(value);
    };
    if (typeof window !== "undefined") {
      handleResize(window.innerWidth);

      window.addEventListener("resize", handleResize);
    }

    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  useEffect(() => {
    open ? peek() : hide(null);
  }, [open]);
  const scalevariant = {
    hidden: { scale: shrink < 550 ? 1 : 0.5 },
    visible: {
      scale: 0.5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const mainvariants = {
    hidden: { x: "-100vw" },
    visible: {
      x: 0,
      transition: {
        delay: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.5,
        duration: 0.8,
        type: "spring",
      },
    },
  };
  const childvariants = {
    hidden: { x: 0, opacity: 0, rotate: 0 },
    visible: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: { type: "linear", duration: 0.4, stiffness: 400 },
    },
    axe: {
      x: 0,
      opacity: 1,
      rotate: 0,
    },
  };
  useEffect(() => {
    console.log(isInView);
  }, [isInView]);
  const peek = async () => {
    if (width < 550) {
      setshrink(true);
      setstest(true);
    }
    setopen(true);
    if (width < 768) {
      setstest(true);
    }

    leftpeek();
    rightpeek();
  };
  async function leftpeek() {
    if (width < 768) {
      await animate(
        scope.current,
        { rotate: -20, x: width > 500 ? -150 : -70, opacity: 1, zIndex: 20 },
        { type: "spring", duration: 0.5, stiffness: 100 }
      );
    } else {
      await animate(
        scope.current,
        { rotate: -20, x: width > 500 ? -150 : -70, opacity: 1 },
        { type: "spring", duration: 0.5, stiffness: 100 }
      );
    }
  }
  async function rightpeek() {
    if (width < 768) {
      await animatesec(
        scopesec.current,
        { rotate: 20, x: width > 500 ? 150 : 70, opacity: 1, zIndex: 20 },
        { type: "spring", duration: 0.5, stiffness: 100 }
      );
    } else {
      await animatesec(
        scopesec.current,
        { rotate: 20, x: width > 500 ? 150 : 70, opacity: 1 },
        { type: "spring", duration: 0.5, stiffness: 100 }
      );
    }
  }
  async function hide(e) {
    setstest(false);
    setshrink(false);
    setopen(false);

    lefthide(e);
    righthide(e);
  }
  async function lefthide(e) {
    await animate(scope.current, { rotate: 0, x: 0, opacity: 0, zIndex: 0 });
  }
  async function righthide(e) {
    await animatesec(scopesec.current, {
      rotate: 0,
      x: 0,
      opacity: 0,
      zIndex: 0,
    });
  }
  const handle = (e) => {
    console.log(e.target.id);
    if (e.target.id === "niko") {
      hide(e);
    }
  };

  return (
    <>
      <main
        onMouseMove={(e) => handle(e)}
        className=" marcellus flex min-h-screen w-screen flex-col  justify-center items-center p-0 m-0 relative   "
        id="niko"
      >
        <motion.div
          // onMouseEnter={(e) => peek(e)}
          ref={scopecont}
          style={{ scale: !stest ? 1 : 0.5 }}
          variants={scalevariant}
          initial="hidden"
          // animate={shrink&&"visible"}
          className=" bg-cyan-700 transition duration-75    max-[550px]:w-[250px] max-[550px]:h-[200px] max-[768px]:w-[300px] max-[768px]:h-[250px]    md:w-[400px] md:h-[300px] flex justify-center items-center absolute z-10  p-1 border border-fuchsia-800   "
          id="peekwrap"
        >
          <div className=" peekmain border-2 rounded-md w-[98%] h-[98%] p-1   border-cyan-400 flex  flex-col items-center relative ">
            {/* <div className=" w-full h-[30%] flex justify-center items-center border-b-2 border-black">
        <img className=' w-[200px] h-[100px]' src="./grlogo.png" alt="" />
        </div> */}
            <div className="  w-full h-[70%] flex justify-center items-center">
              <motion.button
                onClick={() => setopen(!open)}
                whileHover={() => peek()}
                className={` ${
                  !open ? "bg-cyan-200" : "bg-red-400"
                } text-slate-700 border border-cyan-700 w-max rounded-md px-2 py-1 absolute bottom-3 `}
              >
                {!open ? "Join" : "Close"}
              </motion.button>
            </div>
          </div>
        </motion.div>
        <div className=" flex w-max">
          <motion.div
            id=" right peek"
            onClick={() => console.log("hello")}
            ref={scope}
            initial={{ rotate: 0, opacity: 0 }}
            whileHover={{
              rotate: 0,
              zIndex: 20,
              transition: { type: "tween", stiffness: 200, damping: 600 },
            }}
            className="rightPeek overflow-hidden rounded-lg  bg-black max-[768px]:w-[150px] max-[768px]:h-[250px] max-[550px]:w-[120px] max-[550px]:h-[200px]   md:w-[200px] md:h-[300px]  flex flex-col  items-center justify-center relative  "
          >
            <motion.button
              onClick={() => openmodal()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=" max-[550px]:text-sm w-max px-2 py-1 bg-rose-700   rounded-md mt-2 border border-rose-100 text-slate-100 "
            >
              Create lobby
            </motion.button>
            <motion.img
              animate={{ y: [0, 10, 0, 10, 0] }}
              transition={{ ease: "easeInOut", repeat: Infinity, duration: 3 }}
              className="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] mr-24 "
              src="./winyaka.png"
              alt=""
            />
          </motion.div>
          <motion.div
            id="left peek"
            onClick={() => console.log("hello")}
            ref={scopesec}
            initial={{ rotate: 0, opacity: 0 }}
            whileHover={{
              rotate: 0,
              zIndex: 20,
              transition: { type: "tween", stiffness: 200, damping: 600 },
            }}
            className="leftPeek overflow-hidden rounded-lg max-[768px]:w-[150px] max-[768px]:h-[250px] max-[550px]:w-[120px] max-[550px]:h-[200px]  md:w-[200px] md:h-[300px]    flex flex-col  items-center justify-center relative  "
          >
            <motion.img
              animate={{ y: [0, 10, 0, 10, 0] }}
              transition={{ ease: "easeInOut", repeat: Infinity, duration: 3 }}
              className=" w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] "
              src="./EulaCard.png"
              alt=""
            />
            <motion.button
              onClick={() => setslideshow()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=" max-[550px]:text-sm w-max px-2 py-1 bg-cyan-200   rounded-md mt-2 border border-cyan-500 text-slate-800 "
            >
              Join lobby
            </motion.button>
          </motion.div>
        </div>
      </main>
      <section className="sec2 w-screen h-screen flex flex-col justify-center items-center  p-0 m-0 backdrop-blur-md">
        <div
          ref={ref}
          className=" w-full h-full flex justify-center items-center"
        >
          <motion.div
            variants={mainvariants}
            initial="hidden"
            animate={isInView && "visible"}
            className=" overflow-y-scroll blogcont  relative flex  items-center justify-center w-[90%] h-[90%] md:w-[80%] md:h-[80%]  bg-opacity-10 p-2 backdrop-blur-md  "
          >
            <h2 className=" marcellus text-3xl font-bold text-orange-700 absolute top-0 left-0 w-max  px-2 py-1 rounded-sm ">
              Genshin News
            </h2>
            <div className="w-full h-[80%] flex justify-center flex-wrap">
              {blogs[0] &&
                blogs.map((c, i) => (
                  <Blog variantname={childvariants} key={i} blogs={c} />
                ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Lobby;
