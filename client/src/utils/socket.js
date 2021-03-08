const io = require('socket.io-client');

function socketConnection (){
let socket = io('http://localhost:8080');
socket.on("connect",()=>{
    console.log("socket is connected:_"+socket.connection)
    console.log("socket id:_"+socket.id);
})
};
export default socketConnection;