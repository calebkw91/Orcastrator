
import { useContext, useEffect, useState } from "react";

import UserContext from "../../utils/UserContext";

function ChatWindow() {
  const { id } = useContext(UserContext);
  const [chatState, setChatState] = useState({
    message: "",
    userName: "",
    online: false,
    roomUsers: [],
    incomingMessages: [],
  });
  let sendText ="";
  let messages = [];
  const io = require("socket.io-client");
  const socket = io({
    // autoConnect: false,
    auth: {
      userID: id,
      podID: window.location.pathname,
      username: "placeholder",
    },
  });
  socket.oid = id;
  socket.pod = window.location.pathname;
  // useEffect(() => {
  //       if (socket.oid === "") {
  //         console.log(
  //           "socket dose not have username-no connection attempt made"
  //         );
  //         return;
  //       } else {
  //         socket.connect();
  //         console.log("socket connecting");
  //         setChatState({ ...chatState, online: true });
  //         console.log("chat state set to true");
  //       };
      
  // }, []);
  
  socket.on('chatMessage', (data) => {
    console.log(data);
    messages.push(data);
  }); 
   function handleButtonSubmit(e) {
    console.log("calling function");
    console.log(sendText);
    socket.emit('chatMessage',sendText);

  }
  return (
    <div className="chatWindow">
      <ul className="chatmessages"></ul>
      <input
        className="messageTextArea"
        id="chatFeild"
        name="chatFeild"
        placeholder="Type Here"
        type="text"
        onChange={(e) => {
          console.log(e);
          sendText=e.target.value;
        }}
      />
      <button type='button'
        onClick={handleButtonSubmit}
      >SEND</button>
    </div>
  );
}
export default ChatWindow;
