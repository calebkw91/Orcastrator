import { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../../utils/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./style.css";
const io = require("socket.io-client");

// start of react functional component
function ChatWindow(props) {
  // pulling in user context, using props for group context
  const { id, name } = useContext(UserContext);
  //setting two states one for incommin messages and one for outgoing
  const [messages, setMessage] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  //set two refs one for the socket connection and the other for a dummy div in chat box for scrollto()
  const socketRef = useRef();
  const chatBottomRef = useRef();
  //create variable for group passed from props
  let currentPod = props.currentGroup;
  // function to auto scroll to bottom of message pannel in chat box
  const scrollToBottom = () => {
    chatBottomRef.current.scrollIntoView();
  };
  // component life cycle methods
  useEffect(() => {
    // create socket instance and request connection from back end
    socketRef.current = io({
      auth: {
        userID: id,
        podID: currentPod,
        username: "placeholder",
      },
    });
    //set up listeners for socket connection
    socketRef.current.on("connect", () => {
      socketRef.current.emit("join group", currentPod);
    });

    socketRef.current.on("connection_error", (error) => {
      console.log(error);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log(reason);
    });
    // listener and methoud for incomming chat message
    socketRef.current.on("groupBlast", (text, name) => {
      console.log("socket.on,chatMessage");
      console.log(text);
      let x = [];
      messages.forEach((arr) => x.push(arr));
      console.log(x);
      let y = { name, text };
      x.push(y);
      setMessage(x);
      renderChat();
      console.log(messages);
    });
    // call for scroll to bottom of chat pannel
    scrollToBottom();
    // the return of use effect is similiar to commponent will unmount
    return () => {
      //clean up listeners and close socket connection before re render
      socketRef.current.offAny();
      socketRef.current.close();
    };
  }, [messages]);
  // this use effect is to clear message pannel when a new pod is joined
  useEffect(() => {
    setMessage([]);
  }, [currentPod]);
  // this function handles sending messages
  function handleButtonSubmit(e) {
    e.preventDefault();
    console.log("calling emit function");
    let outgoingmessage = sendMessage;
    socketRef.current.emit("chatMessage", outgoingmessage, currentPod, name);
    setSendMessage("");
  }
  //this function is used to render the chat messages
  const renderChat = () => {
    return messages.map((messageOBJ) => (
      <div>
        {messageOBJ.name}: {messageOBJ.text}
      </div>
    ));
  };

  return (
    <Container>
      <div className="col-12" id="chatWindow">
        <Form onSubmit={handleButtonSubmit}>
          <Row className="overflow-auto">
            <Col className="overflow-auto" id="chatmessages">
              {renderChat()}
              <div ref={chatBottomRef}></div>
            </Col>
          </Row>
          <Row>
            <Form.Control
              className="messageTextArea"
              type="text"
              id="chatField"
              name="chatField"
              placeholder="Type Here"
              onChange={(e) => {
                setSendMessage(e.target.value);
              }}
              value={sendMessage}
            />
            <Button onClick={handleButtonSubmit}>SEND</Button>
          </Row>
        </Form>
      </div>
    </Container>
  );
}
export default ChatWindow;
