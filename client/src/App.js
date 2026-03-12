import Room from "./components/Room";
import "./App.css";
import Chat from "./components/Chat";
import {useState} from "react";
import {io} from "socket.io-client";

const socket = io.connect("http://localhost:5001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chatScreen, setChatScreen] = useState(false);

  return (
    <div className="App">
      {!chatScreen ? (
        <Room
          username={username}
          room={room}
          setUsername={setUsername}
          setRoom={setRoom}
          setChatScreen={setChatScreen}
          socket={socket}
        />
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
