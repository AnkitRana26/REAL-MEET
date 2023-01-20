import io from 'socket.io-client';
import { setMessage, setParticipants, setRoomId } from '../store/action';
import { store } from '../store/store';
import * as webRTCHandler from './webRTCHandler';


const SERVER = 'https://realmeet.up.railway.app/';

let socket = null;

export const connectWithSocketIOServer =()=>{
    socket = io(SERVER);
    
    socket.on('connect',()=>{
        console.log('Successfully Connected with socket io server');
        console.log(socket.id);
    })
    socket.on('room-id',(data)=>{
        const {roomId} =data;
        store.dispatch(setRoomId(roomId));
    })

    socket.on('room-update',(data)=>{
        const {connectedUsers} = data;
        console.log(connectedUsers);
        store.dispatch(setParticipants(connectedUsers));
    })

    socket.on('conn-prepare',(data)=>{
        const {connUserSocketId} = data;

        webRTCHandler.preparenewPeerConnection(connUserSocketId,false);
        //inform the user which just join the room that we have preapared for incomming connection
        socket.emit('conn-init',{connUserSocketId:connUserSocketId});

    })
    socket.on('conn-signal',(data)=>{
        webRTCHandler.handleSingnalingData(data);
    })

    socket.on('conn-init',(data)=>{
        const {connUserSocketId} = data;
        webRTCHandler.preparenewPeerConnection(connUserSocketId,true);
    })

    socket.on('user-disconnected',data=>{
        webRTCHandler.removePeerConnection(data);
    })

    socket.on('message-recieved',data=>{
        const messages = store.getState().messages;
        let newMessage = JSON.parse(data);
        store.dispatch(setMessage([...messages,newMessage]));
    })

}


export const createNewRoom =(identity,onlyAudio)=>{
    //Emit an event to server that we would like to create new Room
    const data ={
        identity,
        onlyAudio
    }
    socket.emit('create-new-room',data);
}


export const joinRoom =(identity,roomId,onlyAudio)=>{
    //Emit an event to server that we would like to join a room
    const data ={
        identity,
        roomId,
        onlyAudio
    }

    socket.emit('join-room',data);

}



export const signalPeerData =(data)=>{

    socket.emit('conn-signal',data); 

}


export const sendDataToConnectedUser =(data)=>{
    socket.emit('mssg-sent',data);
    

}