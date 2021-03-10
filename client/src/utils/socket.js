
const io = require('socket.io-client');
const URL = "http://localhost:8080";

function socketConnection (username,podname){
    if(podname===undefined){
        podname="";
    }
    let socket = io(URL+podname,{autoConnect:false});
    socket.auth ={username};
    socket.connect();
    socket.on("connect",()=>{
        console.log("conected to socket with username:_"+socket.username+"to socket id:_"+socket.id);
    }) 

    socket.onAny((event,...args)=>{
            console.log(event,args);
        })
};
export default socketConnection;