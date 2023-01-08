import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import IntroductionPage from './Pages/IntroductionPage/IntroductionPage';
import JoinRoomPage from './Pages/JoinRoomPage/JoinRoomPage';
import RoomPage from './Pages/RoomPage/RoomPage';
import './App.css';
import { connectWithSocketIOServer } from './utils/wss';
import Navbar from './components/Navbar';

function App() {


  useEffect(()=>{
    connectWithSocketIOServer();
  },[])

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/join-room' element={<JoinRoomPage/>}/>
      <Route path='/room' element={<RoomPage/>}/>
      <Route path='/' element={<IntroductionPage/>}/>
    </Routes>
    </>
  );
}

export default App;
