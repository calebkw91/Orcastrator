import { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../../utils/UserContext";
import "./style.css";
const io = require("socket.io-client");

function ChatWindow(props) {
  const { id,name } = useContext(UserContext);
  const [messages, setMessage] = useState([]);
  const [sendMessage,setSendMessage] = useState("");
  const socketRef = useRef();
  let currentPodName = props.currentGroup.name;

  useEffect(() => {
       socketRef.current = io({
      auth: {
        userID: id,
        podID: props.currentGroup.id,
        username: name,
        groupName:props.currentGroup.name
      },
    });
      console.log(" socket open");
    //set a ref of the socket instance with auth information to be used in server side middleware
    
    //register listeners for socket connection
    socketRef.current.on("connect", () => {
      // socketRef.current.emit("join group", currentPodName);
      console.log("emit group join");
    });
    socketRef.current.on("connection_error", (error) => {
      console.log(error);
    });
    socketRef.current.on("disconnect", (reason) => {
      console.log(reason);
    });
    socketRef.current.on("roomMessage",(data) =>{
      let x = [];
      messages.forEach((mes)=>x.push(mes));
      x.push(data);
      setMessage(x);
      renderChat();
    });
    socketRef.current.on("users",(data)=>{
      console.log(data);
    });
    socketRef.current.on("groupBlast", (data) => {
      console.log(" recive chat message");
      let x = [];
      messages.forEach((mes)=>x.push(mes));
      x.push(data);
      setMessage(x);
      renderChat();
    });
    //the return takes place at the end of the component lifecycle(similiar to componentWillUnmount)
    return () => {
      //cleanup listeners and close underlying connection
      console.log("socket close/disconnnect");
        socketRef.current.offAny();
        socketRef.current.close();
    };
  }, [messages,currentPodName]);

  function handleButtonSubmit(e) {
    e.preventDefault();
    let outgoingmessage = sendMessage;
    //emits message to the server
    socketRef.current.emit("chatMessage", outgoingmessage, currentPodName);
    // renderChat();
    setSendMessage("");
    console.log(sendMessage+"_send msg reset");
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
