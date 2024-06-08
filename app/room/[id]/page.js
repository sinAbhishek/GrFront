"use client";
import { Characters } from "@/data/characters";
import { Bosses } from "@/data/bosses";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLayoutEffect } from "react";
import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { split } from "postcss/lib/list";
import { AuthContext } from "@/components/state";
const Room = ({ searchParams }) => {
  // const ENDPOINT = "http://localhost:5000";
  const { Socket, dispatch, rooms, joinedroom } = useContext(AuthContext);
  const [room, setroom] = useState("");
  const [boss, setboss] = useState("");
  const [Character, setCharacter] = useState("");
  const party = [1, 2, 3, 4];
  const pathname = usePathname();
  const router = useRouter();
  const [crews, setcrews] = useState([
    { socketid: null, name: null, character: "Default" },
    { socketid: null, name: null, character: "Default" },
    { socketid: null, name: null, character: "Default" },
    { socketid: null, name: null, character: "Default" },
  ]);

  useLayoutEffect(() => {
    setroom(pathname.split("/")[1]);
    if (joinedroom === null) {
      router.push("/");
    }
  }, [pathname, joinedroom]);

  useEffect(() => {
    // const socket = io(ENDPOINT);
    console.log(pathname);
    Socket &&
      Socket.on("receive", (data) => {
        const lobby = Object.values(data[0])[0];
        console.log(lobby[0]);
        const party = [];
        console.log(data);
        for (let i = 0; i < 4; i++) {
          if (lobby[i]) {
            party.push(lobby[i]);
            // setcrews((prev)=>[...prev,lobby[i]])
          } else {
            party.push({ socketid: null, name: null, character: "Default" });
            // setcrews((prev)=>[...prev,{socketid:null,name:null,character:null}])
          }
        }
        setcrews(party);
      });
    Socket &&
      Socket.emit("send", { room: "6789" }, (error) => {
        if (error) {
          alert(error);
        }
      });
    Socket &&
      Socket.on("bosses", (data) => {
        console.log(data);
        setboss(data.boss);
      });
  }, []);
  useEffect(() => {
    console.log(party);
  }, [party]);
  const colors = {
    Pyro: "#f71933",
    Cryo: "#6eeafa",
    Dendro: "#79e630",
    Electro: "#902ff7",
    Geo: "#e3d752",
    Anemo: "#42f5a7",
    Hydro: "#1b72f5",
  };
  const switchchar = () => {
    console.log(Socket.id);
    const randomCharNo = Math.floor(Math.random() * 80);

    Socket.emit(
      "changecharacter",
      { room: joinedroom, name: Characters[randomCharNo].character },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
  };
  const switchboss = () => {
    console.log(Socket.id);
    const randomBossNo = Math.floor(Math.random() * 40);
    setboss(Bosses[randomBossNo].Boss);
    Socket.emit(
      "updateboss",
      { room: joinedroom, boss: Bosses[randomBossNo].Boss },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
  };

  return (
    <>
      <div className="marcellus w-screen h-screen  relative flex justify-between charsMain ">
        <div className="chars w-[60%] h-[74%] overflow-auto flex flex-wrap relative justify-center border-2 border-red-200 rounded-md p-4  ">
          {Characters.map((c, i) => (
            <div
              key={i}
              className=" w-[80px] flex flex-col justify-center items-center m-2 rounded-md overflow-hidden border border-white"
            >
              <div
                style={{ backgroundColor: `${colors[c.vision]}` }}
                className={` rounded-br-xl w-full h-[80px]`}
              >
                <img
                  className=" w-full h-full border border-orange-800  "
                  src={`../characters/${c.character}.png`}
                  alt=""
                />
              </div>
              <div className=" bg-slate-800 w-full h-4 flex justify-center">
                <p className=" text-xs text-slate-200 font-semibold">
                  {c.character}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="slots absolute  flex bottom-0  w-[60%] h-[25%] justify-center items-center border-2 border-orange-400 rounded-md">
          <div className=" w-max h-max flex items-center justify-center">
            {crews &&
              crews.map((c, i) => (
                <div
                  key={i}
                  className="slotcard  w-[100px] h-[130px] border border-rose-400 rounded-md mx-2 my-2 overflow-hidden relative "
                >
                  <img
                    className=" charImg w-full h-[100px]  border-b border-white "
                    src={
                      c.character !== "Default"
                        ? `../characters/${c.character}.png`
                        : "../paimon.png"
                    }
                    alt=""
                  />
                  <p className=" absolute bottom-[30px] text-white">
                    {c.character}
                  </p>
                  <div className=" h-[30px] flex justify-center">
                    {c.character !== "Default" && (
                      <p className=" w-max h-4 text-white">{c.name}</p>
                    )}
                  </div>
                </div>
              ))}
          </div>

          <div className=" dice flex justify-center items-center ml-12">
            <button
              onClick={() => switchchar()}
              className="  text-slate-200 w-[50px] h-[50px]"
            >
              <img src="../dice.png" alt="" />
            </button>
          </div>
        </div>
        <div className="w-[10%] h-full flex justify-center items-center vs-main ">
          <div className="  w-[100px] h-[100px] ">
            <img className="w-full h-full " src="../vs.png" alt="" />
          </div>
        </div>

        <div className="boss-main w-[30%] flex justify-between items-center h-full">
          <div className=" w-[100%] flex flex-col justify-center items-center">
            <div className="boosbg w-[200px] h-[230px] rounded-md  flex flex-col  items-center justify-between border border-white overflow-hidden">
              <div className="  w-max h-full  ">
                <img
                  className=" w-full h-full"
                  src={
                    boss !== "Default"
                      ? `../bosses/${boss}.jpg`
                      : "../bosslogo.png"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className=" w-full h-[20px] flex justify-center  overflow-hidden">
              {" "}
              <p className=" text-white ">{boss}</p>
            </div>

            <button
              onClick={() => switchboss()}
              className="text-slate-200 w-[50px] h-[50px] mt-4"
            >
              {" "}
              <img src="../dice.png" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="mobile-chars w-[60%] h-[74%] overflow-auto flex flex-wrap relative justify-center border-4 border-red-200 rounded-md p-4  ">
        {Characters.map((c, i) => (
          <div
            key={i}
            className=" w-[80px] flex flex-col justify-center items-center m-2 rounded-md overflow-hidden border border-white"
          >
            <div
              style={{ backgroundColor: `${colors[c.vision]}` }}
              className={` rounded-br-xl w-full h-[80px]`}
            >
              <img
                className=" w-full h-full  "
                src={`../characters/${c.character}.png`}
                alt=""
              />
            </div>
            <div className=" bg-slate-800 w-full h-4 flex justify-center">
              <p className=" text-xs text-slate-200 font-semibold">
                {c.character}
              </p>
            </div>
          </div>
        ))}
        <button onClick={() => console.log(Socket.id)}>check id</button>
      </div>
    </>
  );
};

export default Room;
