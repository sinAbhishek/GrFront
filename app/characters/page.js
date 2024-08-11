"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsChevronCompactLeft } from "react-icons/bs";

import Character from "@/components/Character";
import { characterdetails } from "@/data/charcacterdetail";
const Characters = () => {
  const [currChar, setcurrChar] = useState(0);
  const handleleftclick = () => {
    currChar !== 0 && setcurrChar(currChar - 1);
  };
  const handlerightclick = () => {
    currChar < characterdetails.length - 1 && setcurrChar(currChar + 1);
  };
  return (
    <>
      <Character
        data={characterdetails[currChar]}
        handleleftclick={handleleftclick}
        handlerightclick={handlerightclick}
      />
    </>
  );
};

export default Characters;
