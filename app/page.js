"use client";
import React from "react";

const Page = () => {
  return (
    <div
      className=" w-screen h-screen  bg-cover  bg-center "
      style={{ backgroundImage: "url(./yaemiko.jpg)" }}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 boxshadow "></div>
      <div className="max-[480px]:min-w-[100%] max-[480px]:pl-0 pl-[80px] max-[650px]:min-w-[500px] min-w-[700px]  w-[60%] h-full flex flex-col  justify-center items-center ">
        <img
          className=" z-20 w-[260px] h-[120px]"
          src="./genshinimpact.png"
          alt=""
        />
        <h2 className="alicehead max-[480px]:text-3xl max-[900px]:text-4xl   text-5xl font-semibold text-white z-20">
          EXPERIENCE SEVEN
        </h2>
        <h4 className=" alicehead max-[480px]:text-base text-lg md:text-xl font-semibold text-white z-20">
          NATIONS TEEMING WITH LIFE
        </h4>
      </div>
    </div>
  );
};

export default Page;
