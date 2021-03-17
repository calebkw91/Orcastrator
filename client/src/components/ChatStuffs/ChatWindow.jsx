import {useContext, useEffect} from "react";
import socketConnection from "../../utils/ClientSocket"
import UserContext from "../../utils/UserContext";


function ChatWindow(){
    const{id} = useContext(UserContext);
    
    useEffect(() => {
        socketConnection(id,window.location.pathname);
      });

    return (
        <div className="chatWindow">
            <div>
                <ul className="chatmessages"/>
            </div>
            <input className="messageTextArea" placeholder="Type Here"/>
        </div>
    )
};

export default ChatWindow