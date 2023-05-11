let express = require("express");

let app = express();

let server = require('http').createServer(app);
// let io = require('socket.io')(server);
const cors = require("cors");
const helmet = require("helmet");

let io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

app.use(helmet());
app.use(cors());
const port = 3001;

io.on("connection",(socket)=>{
    console.log("client connected");
    console.log(socket);
    const { roomId } = socket.handshake.query;
    console.log(roomId);
    socket.join(roomId);

    socket.on("CODE_CHANGE",(roomId,data)=>{
      // console.log("here",data);
      socket.to(roomId).emit("CODE_CHANGE",data);
    })
    
    socket.on("disconnect",()=>{
      socket.leave(roomId);
    })    
})

server.listen(port);