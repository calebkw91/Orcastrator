import { useContext, useEffect, } from "react";
import UserContext from "../../utils/UserContext";
const io = require("socket.io-client");

function ChatWindow(props) {
  const { id } = useContext(UserContext);
  let currentPod = props.currentGroup;
  let incommingMessage=["these","are","dummy","messages"];
  let outgoinMessage="";
  let socket = io({
    autoConnect: false,
    auth: {
      userID: id,
      podID: currentPod,
      username: "placeholder",
    },
  });
  useEffect(() => {
        socket.offAny();
        socket.close();
        console.log(id);
        socket.connect();
        console.log("socket connecting");
  }, [id,currentPod]);
  socket.on("connect",()=>{
    console.log(socket.connected);
   socket.emit('join group',currentPod)
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
    socket.emit('chatMessage',outgoinMessage,currentPod);
    outgoinMessage = "";

  }
  return (
    <div className="chatWindow">
      <ul className="chatmessages">
        {incommingMessage.forEach((message)=>(
        <li>{message}</li>
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