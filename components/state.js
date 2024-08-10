"use client";

import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";

var INITIAL_STATE = {
  Socket: null,
  rooms: null,
  joinedroom: null,
  name: null,
  err: false,
  party: [],
};
if (typeof window !== "undefined") {
  INITIAL_STATE = {
    Socket: null,
    rooms: null,
    joinedroom: JSON.parse(localStorage.getItem("joinedroom")) || null,
    name: JSON.parse(localStorage.getItem("name")) || null,
    err: false,
    party: [],
  };
}
export const AuthContext = createContext(INITIAL_STATE);
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "Connect":
      return {
        ...state,
        Socket: action.payload,
      };
    case "setRooms":
      return {
        ...state,
        rooms: action.payload,
      };
    case "JoinedRoom":
      return {
        ...state,
        joinedroom: action.payload,
      };
    case "setname":
      return {
        ...state,
        name: action.payload,
      };
    case "seterr":
      return {
        ...state,
        err: action.payload,
      };
    case "setparty":
      return {
        ...state,
        party: action.payload,
      };

    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("joinedroom", JSON.stringify(state.joinedroom));
  }, [state.joinedroom]);
  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(state.name));
  }, [state.name]);
  useEffect(() => {
    // const ENDPOINT = "https://grbackend-5e4c.onrender.com";
    const ENDPOINT = "http://192.168.1.2:5000";
    const socket = io(ENDPOINT, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 99999,
    });

    socket.on("connect", () => {
      dispatch({ type: "Connect", payload: socket });
      console.log("connected");
    });

    socket.on("roominfo", (data) => {
      console.log(data, "rooms");

      dispatch({ type: "setRooms", payload: data });
      data.forEach((c) => {
        console.log(Object.keys(c));
      });
    });
    socket.on("error", (err) => {
      console.log(err);
      dispatch({ type: "seterr", payload: true });
    });
    socket.on("route", (data) => {
      dispatch({ type: "JoinedRoom", payload: data.path });
      router.push(`/room/${data.path}`);
    });
    socket.on("allLobby", (data) => {
      console.log(data);
    });
    return () => {
      dispatch({ type: "JoinedRoom", payload: null });
      dispatch({ type: "setname", payload: null });
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        Socket: state.Socket,
        rooms: state.rooms,
        err: state.err,
        party: state.party,
        joinedroom: state.joinedroom,
        name: state.name,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
