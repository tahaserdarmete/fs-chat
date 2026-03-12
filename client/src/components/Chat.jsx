import {useEffect, useState} from "react";

const Chat = ({socket, username, room}) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);

    setMessage("");
  };

  console.log("messageList: ", messageList);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[600px] bg-white relative">
        <div className="w-full h-16 bg-gray-700 flex items-center p-2">
          <div className="w-12 h-12 bg-white rounded-full">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="w-full h-[400px] overflow-y-auto">
          {messageList &&
            messageList.map((msg, i) => (
              <div
                className={`${username === msg.username ? "flex justify-end" : "flex justify-start"}`}
              >
                <div
                  className={`w-2/3 h-12 ${username === msg.username ? "bg-blue-600 rounded-br-none" : "bg-gray-500 rounded-bl-none"} text-white m-2 rounded-xl p-2 flex flex-wrap`}
                >
                  <div>{msg.message}</div>
                  <div className="w-full flex justify-end text-xs">
                    {msg.username} - {msg.date}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <input
            type="text"
            placeholder="message send"
            className="w-3/4 h-12 border p-3 outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="w-1/4 bg-indigo-600 text-white h-12 hover:opacity-70 cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
