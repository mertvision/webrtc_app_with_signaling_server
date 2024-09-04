// Libraries
import React, {useContext} from "react";
// Room Context
import {RoomContext} from "../../context/room/RoomContext";
// CSS Files
import "./home.scss";

// Home Page Component
export const Home = () => {
      const {socket} = useContext(RoomContext);

      const createNewRoom = async () => {
            socket.emit("create-room")
      };

      return (
          <div className="home-page">
            <button className="create-room-button" onClick={()=> createNewRoom()}>Create Video Chat</button>
          </div>
      );
};


