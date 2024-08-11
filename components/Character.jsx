import React from "react";
import Image from "next/image";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
const Character = ({ data, handleleftclick, handlerightclick }) => {
  return (
    <div className="max-[480px]:pl-0 h-screen pl-[80px] pt-[80px] flex bg-blue-100 overflow-scroll  ">
      <div className=" w-full max-[768px]:px-[5px] px-[40px] flex flex-col justify-center items-center  h-max relative ">
        <div className=" absolute left-0 top-0 bottom-0 flex justify-center items-center">
          <button
            onClick={() => handleleftclick()}
            className=" w-max  text-slate-600   "
          >
            {" "}
            <BsChevronCompactLeft size={"4rem"} />
          </button>
        </div>
        <div className=" absolute right-0 top-0 bottom-0 flex justify-center items-center">
          <button
            onClick={() => handlerightclick()}
            className=" w-max text-slate-600   "
          >
            {" "}
            <BsChevronCompactRight size={"4rem"} />
          </button>
        </div>

        <div className=" w-[95%] flex justify-center  h-[230px]  relative overflow-hidden">
          <div
            style={{ backgroundImage: `url(./${data.bannerImage})` }}
            className="max-[768px]:h-[150px] w-full h-[200px] absolute bottom-0 right-0 left-0 rounded-lg "
          >
            <div className="max-[768px]:h-[250px] max-[768px]:w-[200px]  w-[300px] h-[400px] absolute right-0 -top-[30px] max-[768px]:-top-[10px]">
              <Image
                src={`/${data.charImage}`}
                priority={true}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {/* <img
              className="max-[768px]:h-[250px] max-[768px]:w-[200px]  w-[300px] h-[400px] absolute right-0 -top-[30px] max-[768px]:-top-[10px] "
              src="./layla.png"
              alt=""
            /> */}
            <div className=" flex flex-col justify-center max-[768px]:pl-2 h-full pl-20">
              <h1 className=" max-[768px]:text-2xl charhead w-[60%] text-4xl font-bold text-white">
                {data.charName}
              </h1>
              <p className=" max-[768px]:text-base charsubhead w-[60%] text-lg font-medium text-white ">
                {data.charDescription}
              </p>
            </div>
          </div>
        </div>
        <div className=" w-[95%] max-[800px]:h-max h-[calc(90vh-230px)] py-10 flex max-[800px]:flex-col justify-between ">
          <div className=" max-[800px]:w-[100%] max-[800px]:h-[300px]  w-[60%] h-full flex justify-between">
            <div className="w-[45%]  bg-contain  rounded-lg flex justify-center items-center relative">
              <h1 className=" charhead absolute top-2 left-2 text-lg font-bold text-slate-700">
                Signature Weapon
              </h1>
              <div className="w-full h-[200px] bg-[#14405e]  rounded-md flex justify-center items-center ">
                <div className=" w-[150px] h-[150px] relative">
                  <Image
                    src={`/${data.bestweapon}`}
                    priority={true}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                {/* <img
                  className=" w-[150px] h-[150px]"
                  src="./keyofkhajnisut.png"
                  alt=""
                /> */}
              </div>
            </div>
            <div className="w-[45%]   rounded-lg flex justify-center items-center relative ">
              <h1 className="charhead absolute top-2 left-2 text-lg font-bold text-slate-800">
                Best Artifact
              </h1>
              <div className="w-full h-[200px] bg-[#14405e]  rounded-md flex justify-center items-center ">
                <div className=" w-[150px] h-[150px] relative">
                  <Image
                    src={`/${data.bestartifact}`}
                    priority={true}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                {/* <img
                  className=" w-[150px] h-[150px]"
                  src="./Tenacity.png"
                  alt=""
                /> */}
              </div>
            </div>
          </div>
          <div className="max-[800px]:w-[100%] w-[30%]  h-full flex flex-col gap-2">
            <div className=" w-full h-[30%] px-2 rounded-md bg-white flex justify-center  gap-2 items-center">
              <div className=" w-[30%]">
                <img
                  className="w-[50px] h-[50px] min-w-[50px] min-h-[50px]"
                  src={`./${data.visionImg}`}
                  alt=""
                />
              </div>
              <div className=" w-[70%] flex flex-col justify-center ">
                <h2 className=" text-sm font-bold text-gray-700">
                  {data.visionName} Character
                </h2>
                <p className=" text-[8px] font-bold text-slate-500">
                  {data.visionDetails}
                </p>
              </div>
            </div>
            <div className=" w-full h-[30%] px-2 rounded-md bg-white flex justify-center  gap-2  items-center">
              <div className=" w-[30%]">
                <img
                  className="w-[50px] h-[50px] min-w-[50px] min-h-[50px]"
                  src={`./${data.nationimg}`}
                  alt=""
                />
              </div>
              <div className=" w-[70%]  flex flex-col justify-center ">
                <h2 className=" text-sm font-bold text-gray-700">
                  {data.nation}
                </h2>
                <p className=" text-[8px] font-bold text-slate-500">
                  {data.nationdetails}
                </p>
              </div>
            </div>
            <div className=" w-full h-[30%] px-2 rounded-md bg-white flex justify-center  gap-2 items-center">
              <div className=" w-[30%]">
                <img
                  className="w-[50px] h-[50px] min-w-[50px] min-h-[50px]"
                  src={`./${data.regionimg}`}
                  alt=""
                />
              </div>
              <div className=" w-[70%] flex flex-col justify-center ">
                <h2 className=" text-sm font-bold text-gray-700">
                  {data.region}
                </h2>
                <p className=" text-[8px] font-bold text-slate-500">
                  {data.regiondetails}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
