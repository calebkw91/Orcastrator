import { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../../utils/UserContext";
import "./style.css";
const io = require("socket.io-client");

function ChatWindow(props) {
  const { id, name } = useContext(UserContext);
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

    socketRef.current.on("groupBlast", (text,name) => {
      console.log("socket.on,chatMessage");
      console.log(text);
      let x = [];
      messages.forEach((arr)=>x.push(arr));
      console.log(x);
      let y = {name,text};
      x.push(y);
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
    socketRef.current.emit("chatMessage", outgoingmessage, currentPodName, name);
    // renderChat();
    setSendMessage("");
    console.log(sendMessage+"_send msg reset");
  }

  const renderChat = () => {
    return messages.map((messageOBJ) => (
       <div ><p>{messageOBJ.name}: {messageOBJ.text}</p></div>));
  };

  return (
    <div className="chatWindow col-12">
      <form className="" onSubmit={handleButtonSubmit}>
        <div className="chatmessages overFlow-auto">{renderChat()}</div>
        <input
          className="messageTextArea"
          id="chatField"
          name="chatField"
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
