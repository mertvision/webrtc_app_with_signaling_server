// Built-in Libraries (Node.js API)
import http from "http";
// Third Party Libraries (NPM)
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
// Own Libraries 
import { DisconnectHandler } from "./handlers/disconnect/DisconnectHandler";
import { RoomHandler } from "./handlers/room/RoomHandler";

const PORT: number = 8000;
const app = express();
app.use(cors({
     origin: "http://localhost:3000"
}));

const server = http.createServer(app);
const socket = new Server(server, {
      cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST", "PUT", "DELETE"]
      },
});

socket.on("connection", socket => {
      console.log("User connected to WebSocket");

      // WebSocket Signals Handlers
      DisconnectHandler(socket)
      RoomHandler(socket);
});

server.listen(PORT, ()=> {
     console.log(`Listening to server on http://localhost:${PORT}`);
});

