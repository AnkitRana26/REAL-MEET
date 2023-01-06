import React, { useEffect } from 'react'

const JoinRoomTitle = ({ isRoomHost }) => {

    const titleText = isRoomHost ? 'Host Meeting' : 'Join Meeting'
    useEffect(()=>{

    },[isRoomHost])
    return (
        <p className='join_room_title'>
            {titleText}
        </p>
    )
}

export default JoinRoomTitle