import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../providers/Socket'

const Home = () => {

  const [email, setEmail] = useState('');
  const [roomId, setRoomId] = useState('')
  const socket = useSocket();
  const navigate = useNavigate();

  const handleRoomJoined =({roomId}) => {
    
    navigate(`/room/${roomId}`)

    
  }


  useEffect(()=>{
    socket.on('joined-room',handleRoomJoined)
  },[socket])


  const handleJoinRoom = () => {
      socket.emit('join-room',{emailId:email,roomId});
      
  }


  return (
    <div className="homepageContainer">
      <div className='inputContainer'>
        <h1>Enter Details To Start Meeting</h1>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="" id="" placeholder='Enter Your Email Here' />
        <input value={roomId} onChange={(e) => setRoomId(e.target.value)} type="text" name="" id="" placeholder='Enter Room Code' />
        <button onClick={handleJoinRoom}>Enter Meeting</button>
      </div>
    </div>
  )
}

export default Home