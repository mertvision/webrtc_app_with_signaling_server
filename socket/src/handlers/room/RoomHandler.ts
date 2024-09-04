// Third Party Libraries
import {Socket} from "socket.io";
import {v4 as uuidv4} from "uuid";

/* "rooms" adlı değişken Record<string, string[]> veri tipine sahiptir. Anahtar değerler string, değerler string dizisi olmak zorunda olan
bir objedir. */
const rooms: Record<string, string[]> = {};

interface IRoomParams {
      roomId: string,
      peerId: string,
};

export const RoomHandler = async (socket: Socket) => {

       // Create Room Function
       const createRoom = async () => {
             const roomId = uuidv4();
             // Rooms objesine roomId anahtarını ekle (yeni oda ekle). = []; ise anahtarın string dizi tipindeki değerleridir.
             rooms[roomId] = [];

             socket.emit("room-created", {roomId});
             console.log("User created a room. RoomId:", roomId);
             console.log(rooms)
       };

       // Join Room Function
       const joinRoom = async ({roomId, peerId}: IRoomParams) => {
            if(rooms[roomId]){
              console.log("User joined a room. RoomId:", roomId);
              rooms[roomId].push(peerId);
              socket.join(roomId);
              socket.emit('get-users', {
                  roomId,
                  participants: rooms[roomId]
              });
            };

            socket.on("disconnect", ()=> {
               console.log("User left the room:", peerId);
               leaveRoom({roomId, peerId});
            });
      };

      const leaveRoom = ({peerId, roomId}: IRoomParams) => {
            rooms[roomId] = rooms[roomId].filter((id)=> id !== peerId);
            socket.to(roomId).emit("user-disconnected", peerId);
      };

      socket.on("create-room", createRoom);
      socket.on("join-room", joinRoom);
};
