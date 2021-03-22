import { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../../utils/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Row, Col} from "react-bootstrap";
import "./style.css";
const io = require("socket.io-client");

function ChatWindow(props) {
  const { id, name } = useContext(UserContext);
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

    socketRef.current.on("groupBlast", (text,name) => {
      console.log("socket.on,chatMessage");
      console.log(text);
      let x = [];
      messages.forEach((arr)=>x.push(arr));
      console.log(x);
      let y = {name,text}
      x.push(y);
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
    socketRef.current.emit("chatMessage", outgoingmessage, currentPod, name);
    // renderChat();
    setSendMessage("");
  }

  const renderChat = () => {
    return messages.map((messageOBJ) => (
       <div >{messageOBJ.name}: {messageOBJ.text}</div>));
  };

  return (
    <Container>
    <div className="col-12" id="chatWindow">
      <Row>
      <form  onSubmit={handleButtonSubmit}>
        <Col className="overflow-auto" id="chatmessages">{renderChat()}</Col>
        <Row>
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
        </Row>
      </form>
      </Row>
    </div>
    </Container>
  );
}
export default ChatWindow;
