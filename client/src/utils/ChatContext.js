import React from "react";

const ChatContext = React.createContext({
    message: "",
    userName: "",
    online: true,
    roomUsers:[]
});

export default ChatContext;