import {useContext, useEffect,useState} from "react";
import socketConnection from "../../utils/SocketConnection"
import UserContext from "../../utils/UserContext";

const [chatState, setChatState] = useState({
    message: "",
    userName: "",
    online: true,
    roomUsers:[],
  });

    

const io = require("socket.io-client");
const socket = io({autoConnect:false});

socket.onAny((event,...args)=>{console.log(event,...args);});
socket.on("users",(users)=>{
    console.log(users);
    // users.forEach((user)=>{
    //     user.self = user.userID === socket.id;
    // });
    // //put the current user first then sort by name
    // this.users = users.sort((a,b)=>{
    //     if(a.self)return -1;
    //     if(b.self)return 1;
    //     if(a.username<b.username) return -1;
    //     return a.username>b.username? 1:0;
    // });
    
});

function handleButtonSubmit(e){
    e.preventDefault();

}

socket.on("chat message",(data)=>{
    console.log(data);
})

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
            <button onclick={handleButtonSubmit}/>
        </div>
    )
};

export default ChatWindow