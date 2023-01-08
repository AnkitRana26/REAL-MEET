import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import IntroductionPage from './Pages/IntroductionPage/IntroductionPage';
import JoinRoomPage from './Pages/JoinRoomPage/JoinRoomPage';
import RoomPage from './Pages/RoomPage/RoomPage';
import './App.css';
import { connectWithSocketIOServer } from './utils/wss';
import Navbar from './components/Navbar';
import WrapperComponent from './components/WrapperComponent';

function App() {


  useEffect(()=>{
    connectWithSocketIOServer();
  },[])

  return (
    <>
    
    <Routes >
      <Route path='/join-room' element={<WrapperComponent><JoinRoomPage/></WrapperComponent>}/>
      <Route path='/room' element={<RoomPage/>}/>
      <Route path='/' element={<WrapperComponent><IntroductionPage/></WrapperComponent>}/>
    </Routes>
    </>
  );
}

export default App;
