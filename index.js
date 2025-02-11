const express = require('express');
app = express();
const http = require('http');
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const {Server} = require('socket.io');

const io = new Server(server,{
    cors: {
        origin: true, // Allow all origins
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


io.on("connection",(socket)=>{
    console.log(`User Connected : ${socket.id}`);

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data);
    })

    socket.on("disconnect",()=>{
        console.log(`User Disconnected : ${socket.id}`);
    });
});

server.listen(3001,()=>{  
    console.log("Server is Running");
});