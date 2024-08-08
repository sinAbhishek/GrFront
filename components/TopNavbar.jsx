"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
const TopNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [color, setcolor] = useState("text-slate-800");
  console.log(pathname);
  useEffect(() => {
    if (pathname === "/characters" || pathname === "/randomiser") {
      setcolor("text-slate-800");
    } else {
      setcolor("text-slate-100");
    }
  }, [pathname]);

  return (
    <div
      style={{ backgroundColor: pathname === "/" && "#10040b" }}
      className={`  w-screen max-[480px]:pl-0 max-[480px]:justify-center fixed  flex justify-start gap-8 pl-[90px] h-[80px] items-center z-10`}
    >
      <button
        className={`${color} w-max absolute left-1 flex justify-center items-center  mb-1`}
        onClick={() => router.push("/")}
      >
        <FaHome size={"1.3rem"} />
      </button>

      <button
        onClick={() => router.push("/characters")}
        className={`${color} noto `}
      >
        CHARACTERS
      </button>
      <button
        onClick={() => router.push("/randomiser")}
        className={`${color} noto `}
      >
        RANDOMISER
      </button>
      <button
        onClick={() => router.push("/events")}
        className={`${color} noto `}
      >
        NEWS & EVENTS
      </button>
    </div>
  );
};

export default TopNavbar;
