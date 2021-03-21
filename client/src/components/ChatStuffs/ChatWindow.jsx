import { set } from "mongoose";
import { useContext, useEffect, useState, setState, useRef } from "react";
import UserContext from "../../utils/UserContext";
import "./style.css";
const io = require("socket.io-client");

function ChatWindow(props) {
  const { id } = useContext(UserContext);
  const [messages, setMessage] = useState([]);
  const [sendMessage,setSendMessage] = useState("");
  const socketRef = useRef();
  let currentPod = props.currentGroup;
  
  useEffect(() => {
    socketRef.current = io({
      auth: {
        userID: id,
        podID: currentPod,
        username: "placeholder",
      },
    });

    console.log("socket connecting");
    socketRef.current.on("connect", () => {
      socketRef.current.emit("join group", currentPod);
    });
    socketRef.current.on("connection_error", (error) => {
      console.log(error);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log(reason);
    });

    socketRef.current.on("groupBlast", (data) => {
      console.log("socket.on,chatMessage");
      console.log(data);
      let x = [];
      messages.forEach((mes)=>x.push(mes));
      console.log(x);
      x.push(data);
      setMessage(x);
      renderChat();
      console.log(messages);
    });
    return () => {
      socketRef.current.offAny();
      socketRef.current.close();
    };
  }, [messages,currentPod]);

  function handleButtonSubmit(e) {
    e.preventDefault();
    console.log("calling emit function");
    let outgoingmessage = sendMessage;
    socketRef.current.emit("chatMessage", outgoingmessage, currentPod);
    // renderChat();
    setSendMessage("")
  }

  const renderChat = () => {
    return messages.map((message, index) => (
      <div key={index}>
        <p>{message}</p>
      </div>
    ));
  };

  return (
    <div className="chatWindow">
      <form className="" onSubmit={handleButtonSubmit}>
        <div className="chatmessages">{renderChat()}</div>
        <input
          className="messageTextArea"
          id="chatFeild"
          name="chatFeild"
          placeholder="Type Here"
          type="text"
          onChange={(e) => {
            setSendMessage(e.target.value);
          }}
          value = {sendMessage}
        />
        <button onClick={handleButtonSubmit}>SEND</button>
      </form>
    </div>
  );
}
export default ChatWindow;
