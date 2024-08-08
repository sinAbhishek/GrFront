"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaHome } from "react-icons/fa";
const TopNavbar = () => {
  const router = useRouter();
  return (
    <div className="w-screen max-[480px]:pl-0 max-[480px]:justify-center fixed bg-transparent flex justify-start gap-8 pl-[90px] h-[80px] items-center z-10">
      <button
        className=" w-max absolute left-1 flex justify-center items-center  mb-1"
        onClick={() => router.push("/")}
      >
        <FaHome size={"1.3rem"} />
      </button>

      <h4
        onClick={() => router.push("/characters")}
        className=" noto text-slate-800"
      >
        CHARACTERS
      </h4>
      <h4
        onClick={() => router.push("/randomiser")}
        className=" noto text-slate-800"
      >
        RANDOMISER
      </h4>
      <h4
        onClick={() => router.push("/events")}
        className=" noto text-slate-800"
      >
        NEWS & EVENTS
      </h4>
    </div>
  );
};

export default TopNavbar;
