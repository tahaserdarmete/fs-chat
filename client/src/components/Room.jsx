const Room = ({
  username,
  room,
  setUsername,
  setRoom,
  socket,
  setChatScreen,
}) => {
  const sendRoom = () => {
    socket.emit("room", room);
    setChatScreen(true);
  };

  return (
    <div className="flex items-center justify-center h-full ">
      <div className="w-1/3 h-[320px] rounded-lg bg-indigo-600 flex flex-col space-y-4 p-3">
        <h1 className="font-bold text-2xl text-white text-center my-4">
          Welcome to Chat
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="h-12 rounded-xl p-3 outline-none"
        />
        <input
          type="text"
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="h-12 rounded-xl p-3 outline-none"
        />
        <div
          onClick={sendRoom}
          className="bg-indigo-900 text-white h-12 pt-2 text-xl text-center rounded-xl cursor-pointer hover:opacity-70 tracking-wider"
        >
          Odaya Gir
        </div>
      </div>
    </div>
  );
};

export default Room;
