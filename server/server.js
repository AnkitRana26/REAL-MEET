const express = require('express');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const twilio = require('twilio');





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

})


// Socket.io Handlers


const createNewRoomHandler =(data,socket)=>{
    console.log(`host is creating new room` );
    console.log(data);
    const {identity} = data;

    const roomId = uuidv4();

    //create new user 
    const newUser ={
        identity,
        id:uuidv4(),
        socketId:socket.id,
        roomId
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

    const {identity,roomId} = data;
    const newUser ={
        identity,
        id:uuidv4(),
        socketId:socket.id,
        roomId
    }

    //Join Room as User which just is trying to join room passing room id
    const room = rooms.find(room=>room.id==roomId);
    room.connectedUsers = [...room.connectedUsers,newUser];


    //Join socket.io Room
    socket.join(roomId);

    //add new User to Connected user array;
    connectedUsers = [...connectedUsers,newUser];

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
            io.to(room.id).emit('room-update',{
                connectedUsers:room.connectedUsers
            });
        }
        else{
            rooms = room.filter((r)=>r.id!=room.id);
        }


    }


}




server.listen(PORT, () => {
    console.log(`Server is Listening on ${PORT}`);
})