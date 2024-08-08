import React from "react";

const Characters = () => {
  return (
    <div className=" w-screen h-screen pl-[80px] pt-[80px] flex bg-blue-100  ">
      <div className=" w-full px-[40px] flex flex-col justify-center items-center  h-full">
        <div className=" w-[95%] flex justify-center  h-[230px]  relative overflow-hidden">
          <div
            style={{ backgroundImage: "url(./cryobg.jpeg)" }}
            className=" w-full h-[200px] absolute bottom-0 right-0 left-0 rounded-lg "
          >
            <img
              className=" w-[300px] h-[400px] absolute right-0 -top-[30px] "
              src="./layla.png"
              alt=""
            />
            <div className=" flex flex-col justify-center  h-full pl-20">
              <h1 className=" w-[60%] text-4xl font-bold text-white">Layla</h1>
              <p className=" w-[60%] text-lg font-medium text-white ">
                She is a student in the Rtawahist Darshan,specializing in
                Theouretical Astrology
              </p>
            </div>
          </div>
        </div>
        <div className=" w-[95%]  h-[calc(100%-230px)] py-10 flex justify-between ">
          <div className="w-[30%]  bg-contain  rounded-lg flex justify-center items-center relative">
            <h1 className=" absolute top-2 left-2 text-2xl font-bold text-slate-700">
              Signature Weapon
            </h1>
            <div className="w-full h-[200px] bg-[#14405e]  rounded-md flex justify-center items-center ">
              <img
                className=" w-[150px] h-[150px]"
                src="./keyofkhajnisut.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-[30%]   rounded-lg flex justify-center items-center relative ">
            <h1 className=" absolute top-2 left-2 text-2xl font-bold text-slate-800">
              Best Artifact
            </h1>
            <div className="w-full h-[200px] bg-[#14405e]  rounded-md flex justify-center items-center ">
              <img
                className=" w-[150px] h-[150px]"
                src="./Tenacity.png"
                alt=""
              />
            </div>
          </div>
          <div className=" w-[30%]  h-full flex flex-col gap-2">
            <div className=" w-full h-[30%] px-2 rounded-md bg-white flex justify-center  gap-2 items-center">
              <div className=" w-[30%]">
                <img
                  className="w-[50px] h-[50px] min-w-[50px] min-h-[50px]"
                  src="./cryoicon.png"
                  alt=""
                />
              </div>
              <div className=" flex flex-col justify-center ">
                <h2 className=" text-sm font-bold text-gray-700">
                  Cryo Character
                </h2>
                <p className=" text-[8px] font-bold text-slate-500">
                  Cryo is one of the seven Elements. Its associated Archon is
                  the Tsaritsa, whose domain is Snezhnaya.
                </p>
              </div>
            </div>
            <div className=" w-full h-[30%] px-2 rounded-md bg-white flex justify-center  gap-2  items-center">
              <div className=" w-[30%]">
                <img
                  className="w-[50px] h-[50px] min-w-[50px] min-h-[50px]"
                  src="./sumerulotus.png"
                  alt=""
                />
              </div>
              <div className="  flex flex-col justify-center ">
                <h2 className=" text-sm font-bold text-gray-700">Sumeru</h2>
                <p className=" text-[8px] font-bold text-slate-500">
                  Sumeru is one of the seven regions of Teyvat. It is the nation
                  that worships Lesser Lord Kusanali, the Dendro Archon and God
                  of Wisdom.
                </p>
              </div>
            </div>
            <div className=" w-full h-[30%] px-2 rounded-md bg-white flex justify-center  gap-2 items-center">
              <div className=" w-[30%]">
                <img
                  className="w-[50px] h-[50px] min-w-[50px] min-h-[50px]"
                  src="./akdemia.png"
                  alt=""
                />
              </div>
              <div className=" flex flex-col justify-center ">
                <h2 className=" text-sm font-bold text-gray-700">Akademia</h2>
                <p className=" text-[8px] font-bold text-slate-500">
                  Cryo is one of the seven Elements. Its associated Archon is
                  the Tsaritsa, whose domain is Snezhnaya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;
