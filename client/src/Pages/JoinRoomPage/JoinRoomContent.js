import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setConnectOnlyWithAudio, setIdentity, setRoomId } from '../../store/action';
import { getRoomExists } from '../../utils/api';
import ErrorMessage from './ErrorMessage';
import JoinRoomButton from './JoinRoomButton';
import JoinRoomInput from './JoinRoomInput';
import OnlyWithAudioCheckbos from './OnlyWithAudioCheckbos';

const JoinRoomContent = (props) => {

    const [roomIdValue, setRoomIdValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const { isRoomHost, setConnectOnlyWithAudio, connectOnlyWithAudio,setRoomIdAction,setIdentityAction } = props;
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();


    const handleJoinRoom = async () => {
        setIdentityAction(nameValue);
        if (isRoomHost) {
            createRoom();
        }
        else {
            await joinRoom();
        }
    }

    const joinRoom = async () => {
        const responseMessage = await getRoomExists(roomIdValue);
        const { roomExists, full } = responseMessage;
        if (roomExists) {

            if (full) {
                setErrorMessage('Meeting is Full. Please Try again Later');
            } else {

                setRoomIdAction(roomIdValue);

                navigate('/room')
            }


        } else {
            setErrorMessage('Meeting Not Found Check Your Meeting Id');
        }
    }

    const createRoom = () => {
        navigate('/room');
    }

    return (
        <>
            <JoinRoomInput roomIdValue={roomIdValue} setRoomIdValue={setRoomIdValue} nameValue={nameValue} setNameValue={setNameValue} isRoomHost={isRoomHost} />
            <OnlyWithAudioCheckbos
                setConnectOnlyWithAudio={setConnectOnlyWithAudio}
                connectOnlyWithAudio={connectOnlyWithAudio}
            />
            <ErrorMessage errorMessage={errorMessage} />
            <JoinRoomButton isRoomHost={isRoomHost} handleJoinRoom={handleJoinRoom} />
        </>
    )
}

const mapStoreStateToProps = (state) => {
    return {
        ...state
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        setConnectOnlyWithAudio: (onlyWithAudio) => dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
        setIdentityAction :(identity) => dispatch(setIdentity(identity)),
        setRoomIdAction :(roomId) => dispatch(setRoomId(roomId))
    }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomContent);