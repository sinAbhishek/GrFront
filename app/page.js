"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/state";
import CloseIcon from '@mui/icons-material/Close';
import Slider from "react-slick";
import Blog from "@/components/Blog";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { signOut } from 'firebase/auth';
import { doc, setDoc, updateDoc,collection,getDocs,onSnapshot,query } from "firebase/firestore"; 
import { db } from "./firebase";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { StyledEngineProvider } from "@mui/material";
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,extendVariants,Input} from "@nextui-org/react";
export default function Home() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  const [data,setdata]=useState([])
  const [Name,setName]=useState("Abhi")
  const [loading,setloading]=useState(false)
  const [joinloading,setjoinloading]=useState(false)
  const [openlobby,setopenlobby]=useState(false)
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  const [path,setpath]=useState("")
  const {Socket,dispatch,rooms,joinedroom,err,name}=useContext(AuthContext)
  // const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isOpen,setOpen]=useState(false)
  const [PassOpen,setPassOpen]=useState(false)

  // const [Socket, setSocket] = useState("");
  const router=useRouter()
  const [Character, setCharacter] = useState("");
  // const [rooms, setrooms] = useState("");
  const [crews,setcrews]=useState([]);
  const ENDPOINT = "http://localhost:5000";

useEffect(()=>{
  if(joinedroom!==null){
    Socket&&Socket.emit("leaveroom",{data:"meow"},(err)=>{
      console.log(err)
    })
  }
  dispatch({type:"JoinedRoom",payload:null})
  
},[])
useEffect(()=>{
if(name===null){
  setOpen(true)
}
},[name])

  useEffect(()=>{

    const call=async ()=>{
      const q = query(collection(db, "users"))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const array=[]
        querySnapshot.forEach((doc) => {
          Object.values(doc.data()).forEach((c)=>array.push(c))
      
          // array.push(doc.data());
            console.log({id:doc.id,...doc.data()});
        });
        setdata(array)
      });

    };
    call();
  },[])
  const openNameModal=()=>{
    setOpen(true)
  }
  const closeNameModal=()=>{
    setOpen(false)
  }
  const openPassModal=()=>{
    setPassOpen(true)
  }
  const closePassModal=()=>{
    setPassOpen(false)
  }
  const openLobby=()=>{
    setopenlobby(true)
  }
  const closeLobby=()=>{
    setopenlobby(false)
  }
  const modalState=(e)=>{
    console.log(e)
    setOpen(!isOpen)
  }
  const PassModal=(path,room)=>{
    setpath(path)
    // console.log(e)
    setPassOpen(true)
  }
  const storeName=()=>{
    dispatch({type:"setname",payload:Name})
    closeNameModal()
  }
  const sendmsg = () => {
    Socket.emit("send", { message: "hello" }, (error) => {
      if (error) {
        alert(error);
      }
    });
  };
  const switchchar = () => {
    Socket.emit(
      "changecharacter",
      { room: "12345", name: Character },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
  };
  const join=()=>{
    setloading(true)
    Socket.emit("joinroom",{name,path,password},(error)=>{
      if (error) {
        alert(error);
      }
    })
    // setloading(false)
    // dispatch({type:"JoinedRoom",payload:path})
  }
  const call = (room) => {
    console.log(rooms);
    console.log(Socket);
    setloading(true)
    Socket&&Socket.emit("createroom", { name, room,password }, (error) => {
      if (error) {
        alert(error);
      }
      
    });
    // router.push(`./${room}`)
    // dispatch({type:"JoinedRoom",payload:room})
  };
  const leave = (room) => {
    console.log(room);
    Socket.emit("leave", {room:"6789"}, (error) => {
      if (error) {
        alert(error);
      }
    });
  };
  const getlobbies = (room) => {
    console.log(room);
    Socket.emit("lobbies", room, (error) => {
      if (error) {
        alert(error);
      }
    });
  };
  const setPass=(e)=>{
    e.preventDefault()
    console.log(e)
    setPassword(e.target.value)
  }
  const changeName=(e)=>{
    e.preventDefault()
    console.log(e.target.value)
    setName(e.target.value)
      }

  return (
    <main className="marcellus flex h-screen justify-between  w-screen main">
      <div className=" w-[30%] flex flex-col items-center bg-slate-400 h-full lobby-main ">
      <div className=" top_bar justify-between">
            <h4 className="text-[#e6cda1] font-medium">Lobbies</h4>
            <button onClick={()=>setopenlobby(true)} className=" bg-red-300 px-2 py-1 rounded-full md:hidden ">Create lobby</button>
          </div>
          {rooms?rooms.map((c,i)=> <div key={i} className="  w-[95%]   h-12 my-2 rounded-full relative overflow-hidden">
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
  
       <button onClick={()=>PassModal(Object.keys(c)[0])} className="btn-primary   ">
              Join
            </button>
          
           
          </div>
        </div>):<div className=" w-full h-full flex flex-col justify-center items-center">
          <div className=" w-[100px] h-[100px] ">
         <img className=" bg-cover" src="./qiqialt.png" alt="" />
          </div>
      <p className=" text-white font-medium">No lobbies</p>
          </div>}
 
      </div>

      <div className="w-[75%] h-full main-right ">
        <div className=" flex flex-col justify-center items-center w-full h-full">
        <div className="create-lobby ">
          <div className=" top_bar">
            <h4 className="text-[#e6cda1] font-medium">Create Lobby</h4>
          </div>
          <div className=" relative lobbyDetails bg-opacity-10  backdrop-blur-lg  bg-white w-[50%] h-[80%] my-2 rounded-md flex flex-col justify-center items-center">
            <img src="./hoyoverse-logo.png" className=" w-[250px] h-[50px] mb-8 mt-4" alt="" />
            <input type="text" className=" input-lobby" placeholder="Enter lobby name"   onChange={(event) => setRoom(event.target.value)} />
            <input type="password" className=" input-lobby" placeholder="Enter lobby password"   onChange={(event) => setPassword(event.target.value)} />
            <button disabled={loading} onClick={()=>call(room)} className=" btn-lobby">Create lobby</button>
            {loading&&<div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
          </div>
</div>
<div className=" blog">
<div className=" top_bar">
            <h4 className="text-[#e6cda1] font-medium">Blogs</h4>
         
          </div>
          <div className="sliderCont w-full h-[50%] mt-2 ">
          <Slider {...settings}>
          {data&&data.map((c,i)=>  <Blog key={i} blogs={c}/>)}
            </Slider>
        
          </div>
       
{/* <button onClick={()=>console.log(Socket.id)} className="bg-white text-black">Check</button> */}
</div>
        </div>
       
      </div>
   <StyledEngineProvider injectFirst>
      <Modal
        open={isOpen}
        onClose={null}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      sx={{backdropFilter:"blur(10px)"}}
        
       
      >
       
        <Box sx={style}    className="name-main marcellus">
      
        <img src="./paimon2.png" alt="" className=" w-[150px] h-[150px] absolute -top-24 left-[150px] z-50 "/>
              <div className=" desc w-[200px] h-[50px] absolute -top-[50px] left-0  flex justify-center items-center ">
                <p className=" text-white font-medium z-20">ENTER YOUR NAME</p>
              </div>
              <div className=" w-full h-full flex flex-col justify-center items-center">
              <input onChange={changeName} className=" h-11 w-[300px] outline-none border border-slate-300 rounded-md text-slate-900 px-2" type="text" placeholder="Enter your name" />
              <button onClick={()=>storeName()} className=" mt-8 bg-orange-700 font-medium text-slate-100 w-max py-1 px-2 rounded-sm">Submit</button>
              </div>
       
        </Box>
      </Modal>
      </StyledEngineProvider>
      {/* <Button onClick={openPassModal}>Open modal</Button> */}
      <StyledEngineProvider injectFirst>
      <Modal
        open={PassOpen}
        onClose={null}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{backdropFilter:"blur(10px)"}}
      >
        <Box sx={style} className="isittest marcellus relative">
          <button onClick={()=>closePassModal()}  className=" absolute top-0 right-0">
          <CloseIcon/>
          </button>
         
          {/* <button className=" absolute top-0 right-0" onClick={()=>closePassModal()}>close</button> */}
          <img src="./paimon2.png" alt="" className=" w-[150px] h-[150px] absolute -top-24 left-[150px] z-50 "/>
           <div className=" desc w-[200px] h-[50px] absolute -top-[50px] left-0  flex justify-center items-center ">
             <p className="  text-white font-medium z-20">ENTER YOUR PASSWORD</p>
           </div>
           <div className=" w-full h-full flex flex-col justify-center items-center">
           <input className=" h-11 w-[300px] outline-none border border-slate-300 rounded-md text-slate-900 px-2" type="text" placeholder="Enter your password" onChange={setPass} />
           <button onClick={()=>join()} className=" mt-8 bg-orange-700 font-medium text-slate-100 w-max py-1 px-2 rounded-sm">Submit</button>
           {loading&&<div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
           {err&&<p className=" text-red-500 italic text-xs font-medium">Password is incorrect</p>}
           </div>
      
        </Box>
      </Modal>
      <Modal
        open={openlobby}
        onClose={null}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{backdropFilter:"blur(10px)"}}
      >
        <Box sx={style} className="isittest marcellus relative">
          <button onClick={()=>closeLobby()}  className=" absolute top-0 right-0">
          <CloseIcon/>
          </button>
         
          {/* <button className=" absolute top-0 right-0" onClick={()=>closePassModal()}>close</button> */}
          <img src="./paimon2.png" alt="" className=" w-[150px] h-[150px] absolute -top-24 left-[150px] z-50 "/>
           <div className=" desc w-[200px] h-[50px] absolute -top-[50px] left-0  flex justify-center items-center ">
             <p className="  text-white font-medium z-20">CREATE LOBBY</p>
           </div>
           <div className=" w-full h-full flex flex-col justify-center items-center">
           <div className=" relative lobbyDetails bg-opacity-10  backdrop-blur-lg  bg-white w-[100%] h-[80%] my-2 rounded-md flex flex-col justify-center items-center">
            <img src="./hoyoverse-logo.png" className=" w-[280px] h-[50px] mb-8 mt-4" alt="" />
            <input type="text" className=" my-2 h-11 w-[300px] outline-none border border-slate-300 rounded-md text-slate-900 px-2 " placeholder="Enter lobby name"   onChange={(event) => setRoom(event.target.value)} />
            <input type="password" className=" h-11 w-[300px] outline-none border border-slate-300 rounded-md text-slate-900 px-2 " placeholder="Enter lobby password"   onChange={(event) => setPassword(event.target.value)} />
            <button disabled={loading} onClick={()=>call(room)} className=" btn-lobby">Create lobby</button>
           
            {loading&& <div className=" w-full flex justify-center items-center relative"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>}
          </div>
           </div>
      
        </Box>
      </Modal>
      </StyledEngineProvider>
     
    </main>
  );
  // w-max z-10 bg-orange-100 px-4 py-1 rounded-full
}
