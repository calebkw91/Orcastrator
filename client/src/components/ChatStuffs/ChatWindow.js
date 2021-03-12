import {useContext, useEffect} from "react";
import socketConnection from "../../utils/ClientSocket"
import UserContext from "../../utils/UserContext"

function ChatWindow(){
   const { id, firstName, lastName, portrait } = useContext(UserContext);
    console.log(" id ",id," firstName ",firstName, " lastName ",lastName," portrait ",portrait);
    let count = 0;
        function run1 (id) {
            if( id !== undefined||null||""){
                if(count === 0){
                    console.log(count);
                    count++
                    socketConnection(id,window.location.pathname);
                }
                else{
                    return
                }
            }
            else{
                return
            }
        };
        run1(id);

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