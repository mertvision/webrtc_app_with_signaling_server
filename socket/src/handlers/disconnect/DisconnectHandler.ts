import {Socket} from "socket.io";

export const DisconnectHandler = async (socket: Socket) => {
       socket.on("disconnect", ()=> {
         console.log("User disconnected")
       });
};