"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/state";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

import Modal from "@mui/material/Modal";
import { StyledEngineProvider } from "@mui/material";

import { motion, useAnimate, useInView } from "framer-motion";
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,extendVariants,Input} from "@nextui-org/react";
export default function Randomiser() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const ref = useRef(null);
  const [data, setdata] = useState([]);
  const [sliderscope, animateslider] = useAnimate();
  const [slideshow, setslideshow] = useState(false);
  const [Name, setName] = useState("Abhi");
  const [loading, setloading] = useState(false);
  const [joinloading, setjoinloading] = useState(false);
  const [openlobby, setopenlobby] = useState(false);
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  const isInView = useInView(ref, { amount: 0.2 });
  const [path, setpath] = useState("");
  const { Socket, dispatch, rooms, joinedroom, err, name } =
    useContext(AuthContext);
  // const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isOpen, setOpen] = useState(false);
  const [PassOpen, setPassOpen] = useState(false);

  // const [Socket, setSocket] = useState("");
  const router = useRouter();
  const [Character, setCharacter] = useState("");
  // const [rooms, setrooms] = useState("");
  const [crews, setcrews] = useState([]);
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    console.log(isInView);
  }, [isInView]);
  useEffect(() => {
    if (joinedroom !== null) {
      Socket &&
        Socket.emit("leaveroom", { data: "meow" }, (err) => {
          console.log(err);
        });
    }
    dispatch({ type: "JoinedRoom", payload: null });
  }, []);
  useEffect(() => {
    if (name === null) {
      setOpen(true);
    }
  }, [name]);

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

  const slidervariant = {
    hidden: { x: "-100%" },
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

  const closeNameModal = () => {
    setOpen(false);
  };

  const closePassModal = () => {
    setPassOpen(false);
  };

  const closeLobby = () => {
    setopenlobby(false);
  };

  const PassModal = (path, room) => {
    setpath(path);
    // console.log(e)
    setPassOpen(true);
  };
  const storeName = () => {
    dispatch({ type: "setname", payload: Name });
    closeNameModal();
  };

  const join = () => {
    setloading(true);
    Socket.emit("joinroom", { name, path, password }, (error) => {
      if (error) {
        alert(error);
      }
    });
  };
  const call = (room) => {
    console.log(rooms);
    console.log(Socket);
    setloading(true);
    Socket &&
      Socket.emit("createroom", { name, room, password }, (error) => {
        if (error) {
          alert(error);
        }
      });
  };

  const setPass = (e) => {
    e.preventDefault();
    console.log(e);
    setPassword(e.target.value);
  };
  const changeName = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setName(e.target.value);
  };
  const close = () => {
    animateslider(sliderscope.current, { x: 0 });
  };
  return (
    <>
      <div className="home marcellus w-screen h-screen relative flex justify-between">
        <motion.div
          ref={sliderscope}
          variants={slidervariant}
          initial={"hidden"}
          animate={slideshow && "visible"}
          className=" w-[40%] min-w-[450px] max-[500px]:min-w-[100%] flex flex-col items-center bg-slate-400 h-screen lobby-main absolute left-0 top-0 py-4 z-30"
        >
          <button
            onClick={() => animateslider(sliderscope.current, { x: "-100%" })}
            className=" absolute top-0 right-0"
          >
            <CloseIcon />
          </button>
          {rooms ? (
            rooms.map((c, i) => (
              <div
                key={i}
                className="  w-[95%]   h-12 my-2 rounded-full relative overflow-hidden"
              >
                <div
                  style={{
                    backgroundImage: `  linear-gradient(to right,rgba(245, 243, 237,1)10%,rgba(245, 243, 237,0)80%),url("./eulanamecard.png")`,
                  }}
                  className="absolute right-0 top-0 bottom-0 w-[50%] lobby_info "
                ></div>
                <div className="  setbg w-full  h-full flex justify-between items-center z-20 px-4  ">
                  <div className=" w-1/3">
                    <p>{Object.keys(c)[0]}</p>
                  </div>
                  <div className=" w-1/3 z-10">
                    <p>{Object.values(c)[0].length}/4</p>
                  </div>

                  <button
                    onClick={() => PassModal(Object.keys(c)[0])}
                    className="btn-primary   "
                  >
                    Join
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className=" w-full h-full flex flex-col justify-center items-center">
              <div className=" w-[100px] h-[100px] ">
                <img className=" bg-cover" src="./qiqialt.png" alt="" />
              </div>
              <p className=" text-slate-800 font-medium">No lobbies</p>
            </div>
          )}
        </motion.div>

        <div className=" w-full pl-[80px] max-[480px]:pl-0 relative flex justify-center items-center">
          <div className=" min-w-[450px] max-[450px]:min-w-[98%] w-[40%] h-[400px] relative bg-white bg-opacity-15">
            <img
              src="./paimon2.png"
              alt=""
              className=" w-[150px] h-[150px] absolute -top-24 left-[150px] z-50 "
            />
            <div
              onClick={() => close()}
              className=" hover:cursor-pointer desc w-[200px] h-[50px] absolute -top-[50px] left-0  flex justify-center items-center "
            >
              <p className="  text-white font-medium z-20">JOIN LOBBY</p>
            </div>
            <div className=" w-full h-full flex flex-col items-center">
              <div className=" relative lobbyDetails bg-opacity-10  backdrop-blur-lg  bg-white w-[100%] h-[80%]  rounded-md flex flex-col justify-center items-center">
                <img
                  src="./hoyoverse-logo.png"
                  className=" w-[280px] h-[50px] mb-8 mt-4"
                  alt=""
                />
                <input
                  type="text"
                  className=" my-2 h-11 w-[300px] outline-none border border-slate-300 rounded-md text-slate-900 px-2 "
                  placeholder="Enter lobby name"
                  onChange={(event) => setRoom(event.target.value)}
                />
                <input
                  type="password"
                  className=" h-11 w-[300px] outline-none border border-slate-300 rounded-md text-slate-900 px-2 "
                  placeholder="Enter lobby password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  disabled={loading}
                  onClick={() => call(room)}
                  className=" btn-lobby w-[300px]"
                >
                  Create lobby
                </button>

                {loading && (
                  <div className=" w-full flex justify-center items-center relative">
                    <div class="lds-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <StyledEngineProvider injectFirst>
          <Modal
            open={isOpen}
            onClose={null}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ backdropFilter: "blur(10px)" }}
          >
            <Box sx={style} className="name-main marcellus">
              <img
                src="./paimon2.png"
                alt=""
                className=" w-[150px] h-[150px] absolute -top-24 left-[150px] z-50 "
              />
              <div className=" desc w-[200px] h-[50px] absolute -top-[50px] left-0  flex justify-center items-center ">
                <p className=" text-white font-medium z-20">ENTER YOUR NAME</p>
              </div>
              <div className=" w-full h-full flex flex-col justify-center items-center">
                <input
                  onChange={changeName}
                  className=" h-11 w-[300px] outline-none border border-slate-300 rounded-md text-slate-900 px-2"
                  type="text"
                  placeholder="Enter your name"
                />
                <button
                  onClick={() => storeName()}
                  className=" mt-8 bg-orange-700 font-medium text-slate-100 w-max py-1 px-2 rounded-sm"
                >
                  Submit
                </button>
              </div>
            </Box>
          </Modal>
        </StyledEngineProvider>

        <StyledEngineProvider injectFirst>
          <Modal
            open={PassOpen}
            onClose={null}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ backdropFilter: "blur(10px)" }}
          >
            <Box sx={style} className="isittest marcellus relative">
              <button
                onClick={() => closePassModal()}
                className=" absolute top-0 right-0"
              >
                <CloseIcon />
              </button>

              {/* <button className=" absolute top-0 right-0" onClick={()=>closePassModal()}>close</button> */}
              <img
                src="./paimon2.png"
                alt=""
                className=" w-[150px] h-[150px] absolute -top-24 left-[150px] z-50 "
              />
              <div className=" desc w-[200px] h-[50px] absolute -top-[50px] left-0  flex justify-center items-center ">
                <p className="  text-white font-medium z-20">
                  ENTER LOBBY PASSWORD
                </p>
              </div>
              <div className=" w-full h-full flex flex-col justify-center items-center">
                <input
                  className=" h-11 w-[300px] outline-none border border-slate-300 rounded-md text-slate-900 px-2"
                  type="text"
                  placeholder="Enter Lobby password"
                  onChange={setPass}
                />
                <button
                  onClick={() => join()}
                  className=" mt-8 bg-orange-700 font-medium text-slate-100 w-max py-1 px-2 rounded-sm"
                >
                  Submit
                </button>
                {loading && (
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                )}
                {err && (
                  <p className=" text-red-500 italic text-xs font-medium">
                    Password is incorrect
                  </p>
                )}
              </div>
            </Box>
          </Modal>
          <Modal
            open={openlobby}
            onClose={null}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ backdropFilter: "blur(10px)" }}
          >
            <Box sx={style} className="isittest marcellus relative">
              <button
                onClick={() => closeLobby()}
                className=" absolute top-0 right-0"
              >
                <CloseIcon />
              </button>

              <img
                src="./paimon2.png"
                alt=""
                className=" w-[150px] h-[150px] absolute -top-24 left-[150px] z-50 "
              />
              <div className=" desc w-[200px] h-[50px] absolute -top-[50px] left-0  flex justify-center items-center ">
                <p className="  text-white font-medium z-20">CREATE LOBBY</p>
              </div>
              <div className=" w-full h-full flex flex-col justify-center items-center">
                <div className=" relative lobbyDetails bg-opacity-10  backdrop-blur-lg  bg-white w-[100%] h-[80%] my-2 rounded-md flex flex-col justify-center items-center">
                  <img
                    src="./hoyoverse-logo.png"
                    className=" w-[280px] h-[50px] mb-8 mt-4"
                    alt=""
                  />
                  <input
                    type="text"
                    className=" my-2 h-11 w-[300px] outline-none border border-slate-300 rounded-md text-slate-900 px-2 "
                    placeholder="Enter lobby name"
                    onChange={(event) => setRoom(event.target.value)}
                  />
                  <input
                    type="password"
                    className=" h-11 w-[300px] outline-none border border-slate-300 rounded-md text-slate-900 px-2 "
                    placeholder="Enter lobby password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <button
                    disabled={loading}
                    onClick={() => call(room)}
                    className=" btn-lobby"
                  >
                    Create lobby
                  </button>

                  {loading && (
                    <div className=" w-full flex justify-center items-center relative">
                      <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Box>
          </Modal>
        </StyledEngineProvider>
      </div>
    </>
  );
  // w-max z-10 bg-orange-100 px-4 py-1 rounded-full
}
