import React from 'react'
import { useNavigate } from 'react-router-dom';

const Button =({buttonText,cancelButton=false,onClickHandler,styles})=>{
    
    return (
        <button style={{...styles}} className='joinButtons' onClick={onClickHandler} >
            {buttonText}
        </button>
    )
}


const JoinRoomButton = ({ handleJoinRoom, isRoomHost }) => {

    const successButtonText = isRoomHost ? "Host" : "Join";
    const navigate = useNavigate();
    const pushToIntroductionPage =()=>{
        navigate('/');
    }

    return (
        <div className='join_room_buttons_container'>
            <Button styles={{ backgroundColor: 'green', color: 'white', fontSize: '20px', padding: '15px', width: '50%', border: 'none', outline: 'none', boxShadow: '0 0 3px white', marginTop: '5%' }} buttonText={successButtonText} onClickHandler={handleJoinRoom}/>
            <Button styles={{ backgroundColor: '#5dbea3', color: 'white', fontSize: '20px', padding: '15px', width: '50%', border: 'none', outline: 'none', boxShadow: '0 0 3px white', marginTop: '5%' }}buttonText={'Cancel'} cancelButton onClickHandler={pushToIntroductionPage}/>
        </div>
    )
}

export default JoinRoomButton