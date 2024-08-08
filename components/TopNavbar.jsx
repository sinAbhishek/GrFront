"use client";

import { useRouter } from "next/navigation";
import React from "react";

const TopNavbar = () => {
  const router = useRouter();
  return (
    <div className=" fixed bg-transparent flex justify-start gap-8 pl-[90px] h-[80px] items-center z-10">
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
