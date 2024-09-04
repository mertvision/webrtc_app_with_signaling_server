import "./styles/global.scss";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Room } from "./pages/room/Room";
import { RoomContextProvider } from './context/room/RoomContext';
function App() {
 
  return (
     <BrowserRouter>
      <RoomContextProvider>
        <Routes>
         <Route path="/" element={<Home />}/>
         <Route path="/room/:id" element={<Room />}/>
       </Routes>
      </RoomContextProvider>
     </BrowserRouter> 
  );
}

export default App;
