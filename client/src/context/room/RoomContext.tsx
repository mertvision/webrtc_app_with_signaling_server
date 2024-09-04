// Libraries
import React, {useState, createContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {v4 as uuidV4} from "uuid";
import {io} from "socket.io-client";
import Peer from "peerjs";

// Socket Server Address
const SocketServerAddress: string = "http://localhost:8000";
// Socket Server Connection with "io" from "socket.io-client";
const socket = io(SocketServerAddress);

// Room Context
export const RoomContext = createContext<null | any>(null);

// Room Context Provider
export const RoomContextProvider: React.FunctionComponent<{children: React.ReactNode}> = ({children}) => {
       const navigate = useNavigate();
       const [me, setMe] = useState<Peer>();
       const [stream, setStream] = useState<MediaStream>();

       // Socket functions
       const enterRoom = async ({roomId}: {roomId: string}) => {
             navigate(`/room/${roomId}`);
       };
       const getUsers = async ({participants}: {participants: string[]}) => {
             console.log({participants});
       };

       useEffect(()=> {
            const meId = uuidV4();
            const peer = new Peer();
            setMe(peer);

            try{
               navigator.mediaDevices.getUserMedia({video: true, audio: true})
               .then((stream)=> {setStream(stream)});
            }
            catch(err){
               console.log(err)
            }

            socket.on("room-created", enterRoom);
            socket.on("get-users", getUsers);
       }, [])

       return (
        <RoomContext.Provider value={{socket, me, stream}}>{children}</RoomContext.Provider>
       );
};

