import {useEffect} from "react";
import socketConnection from "../../utils/socket"

function ChatWindow(){
    useEffect(() => {
        socketConnection("haventDoneAnythingYet");
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