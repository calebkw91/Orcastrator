import { useContext, useEffect, useState } from "react";
import socketConnection from "../../utils/SocketConnection";
import UserContext from "../../utils/UserContext";
const io = require("socket.io-client");

function ChatWindow() {
  const { id } = useContext(UserContext);
  let incommingMessage=["these","are","dummy","messages"];
  let outgoinMessage="";
  let socket = io({
    autoConnect: false,
    auth: {
      userID: id,
      podID: window.location.pathname,
      username: "placeholder",
    },
  });
  useEffect(() => {
        socket.offAny();
        socket.close();
        console.log(id);
        socket.connect();
        console.log("socket connecting");
  }, [id]);
  socket.on("connect",()=>{
    console.log(socket.connected);
   socket.emit('join group',window.location.pathname)
  });
  socket.on("connection_error",(error)=>{console.log(error);})
  socket.on("disconnect",(reason)=>{console.log(reason);});
  socket.on("chatMessage", (data) => {
    console.log("socket.on,chatMessage");
    console.log(data);
    incommingMessage.push(data);
    
  });

   function handleButtonSubmit(e) {
    console.log("calling emit function");
    socket.emit('chatMessage',outgoinMessage,window.location.pathname);
    outgoinMessage = "";

  }
  return (
    <div className="chatWindow">
      <ul className="chatmessages">
        {incommingMessage.forEach((message)=>(
        <li></li>
        ))}
      </ul>
      <input
        className="messageTextArea"
        id="chatFeild"
        name="chatFeild"
        placeholder="Type Here"
        type="text"
        onChange={(e) => {
          outgoinMessage = e.target.value;
        }}
      />
      <button type="submit" onClick={handleButtonSubmit}>
        SEND
      </button>
    </div>
  );
}
export default ChatWindow;
