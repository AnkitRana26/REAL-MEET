import React from 'react'
import ConnectingButton from './ConnectingButton'
import {useNavigate} from 'react-router-dom';
const ConnectingButtons = () => {
    const history = useNavigate()
    const pushToJoinRoomPage =()=>{
        history('/join-room');
    }

    const pushToJoinRoomPageAsHost =()=>{
        history('join-room?host=true');
    }


  return (
    <div className='connecting_buttons_container'>
        <ConnectingButton buttonText='Join a Meeting' onClickHandler={pushToJoinRoomPage} />
        <ConnectingButton createRoomButton buttonText='Host a Meeting' onClickHandler={pushToJoinRoomPageAsHost} />
    </div>
  )
}

export default ConnectingButtons