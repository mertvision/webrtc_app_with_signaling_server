// Libraries
import {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
// Components
import {VideoPlayer} from "../../components/VideoPlayer/VideoPlayer";
// Room Context
import {RoomContext} from "../../context/room/RoomContext";

// Room Page Component
export const Room = () => {
       const {id} = useParams();
       const {socket, me, stream} = useContext(RoomContext);
       
       useEffect(()=> {
         if (me) socket.emit("join-room", {roomId: id, peerId: me._id});
       }, [id, socket, me]);

       return (
         <div className="room-page">
            Room id: {id}
            <VideoPlayer stream={stream}/>
         </div>
       )
};