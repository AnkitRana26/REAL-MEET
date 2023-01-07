const express = require('express');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();
const data = process.env;




const PORT = process.env.PORT || 5002;

const app = express();

const server = http.createServer(app);

app.use(cors());

let connectedUsers = [];
let rooms = [];


//create route to chek if room exists

app.get('/api/room-exists/:roomId', (req, res) => {
    const { roomId } = req.params;
    const room = rooms.find(room => room.id === roomId);

    if (room) {
        if (room.connectedUsers.length > 3) {
            return res.send({ roomExists: true, full: true });
        }
        else {
            return res.send({ roomExists: true, full: false });
        }
    }
    else {
        return res.send({ roomExists: false });
    }

})

app.get('/api/check',(req,res)=>{
    
    res.send({"status":"allOkay"});

})

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection',(socket)=>{

    console.log('User Connected ',socket.id);
    socket.on('create-new-room',(data)=>{
        createNewRoomHandler(data,socket);
    })
    socket.on('join-room',(data)=>{

        joinRoomhandler(data,socket);

    })
    socket.on('disconnect',()=>{
        disconnectHandler(socket);
    })

    socket.on('conn-signal',data=>{
        signalHandler(data,socket);
    })

    socket.on('conn-init',data=>{
        initializeConnectionHandler(data,socket);
    })

    socket.on('mssg-sent',data=>{
        sendMessageHandler(data,socket);
    })

})


// Socket.io Handlers


const createNewRoomHandler =(data,socket)=>{
    console.log(`host is creating new room` );
    console.log(data);
    const {identity,onlyAudio} = data;

    const roomId = uuidv4();

    //create new user 
    const newUser ={
        identity,
        id:uuidv4(),
        socketId:socket.id,
        roomId,
        onlyAudio
    }

    //Push That user to Connected Users
    connectedUsers = [...connectedUsers,newUser];

    //create new room 

    const newRoom = {
        id:roomId,
        connectedUsers:[newUser]
    }

    //Join Socket.io room
    socket.join(roomId);

    rooms =  [...rooms,newRoom];

    //emit to that client which created that room roomId

    socket.emit('room-id',{roomId});

    //emit an event to all users connected to that room about new users which are right nin this room

    socket.emit('room-update',{connectedUsers:newRoom.connectedUsers});




}

const joinRoomhandler =(data,socket)=>{

    const {identity,roomId,onlyAudio} = data;
    const newUser ={
        identity,
        id:uuidv4(),
        socketId:socket.id,
        roomId,
        onlyAudio
    }

    //Join Room as User which just is trying to join room passing room id
    const room = rooms.find(room=>room.id==roomId);
    room.connectedUsers = [...room.connectedUsers,newUser];


    //Join socket.io Room
    socket.join(roomId);

    //add new User to Connected user array;
    connectedUsers = [...connectedUsers,newUser];


    //emit to all users which are already in this room to prepare peer connection 
    room.connectedUsers.forEach(user => {
         
        if(user.socketId !==socket.id){
            const data ={
                connUserSocketId:socket.id
            }

            io.to(user.socketId).emit('conn-prepare',data);

        }

    });



    io.to(roomId).emit('room-update',{connectedUsers:room.connectedUsers});




}


const disconnectHandler =(socket)=>{
    const user = connectedUsers.find((user)=>user.socketId ===socket.id);
    if(user){
        //remove user from room  in server;
        const room = rooms.find(room=>room.id===user.roomId);
        room.connectedUsers = room.connectedUsers.filter(user=>user.socketId !==socket.id);

        socket.leave(user.roomId);

        

        //Closing Room After All Users are getting exit;

        if(room.connectedUsers.length > 0){
            //Emit to all users which are still in the room that user disconnected

            io.to(room.id).emit('user-disconnected',{socketId:socket.id});
            io.to(room.id).emit('room-update',{
                connectedUsers:room.connectedUsers
            });
            
        }
        else{
            rooms = rooms.filter((r)=>r.id!=room.id);
        }


    }


}

const signalHandler =(data,socket)=>{

    const {connUserSocketId,signal} =data;
    const signalingData = {signal,connUserSocketId:socket.id};
    io.to(connUserSocketId).emit('conn-signal',signalingData);



}


//information from clients which are already in room that They have prepared for incoming conncetion

const initializeConnectionHandler =(data,socket)=>{
    const {connUserSocketId} = data;

    const initData = {connUserSocketId:socket.id};
    io.to(connUserSocketId).emit('conn-init',initData);
}


const sendMessageHandler =(data,socket)=>{

    const user = connectedUsers.find(u=>u.socketId==socket.id);
    
    if(user){
        const room = rooms.find(r=>r.id==user.roomId);
        console.log(room);
        room.connectedUsers.forEach(e=>{
            if(e.socketId!==socket.id){
                io.to(e.socketId).emit('message-recieved',data);
            }
        })


    }



}




server.listen(PORT, () => {
    console.log(`Server is Listening on ${PORT}`);
})