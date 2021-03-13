import { useContext, useEffect } from "react";
import socketConnection from "../../utils/ClientSocket";
import UserContext from "../../utils/UserContext";

function ChatWindow() {
  const { id, firstName, lastName, portrait } = useContext(UserContext);
  
useEffect(()=>{
    socketConnection(id, window.location.pathname);
},[id])

 

  return (
    <div>
      <div className="chatWindow">
        <div>
          <ul className="chatmessages" />
        </div>
        <input className="messageTextArea" placeholder="Type Here" />
        
      </div>
    </div>
  );
}

export default ChatWindow;
