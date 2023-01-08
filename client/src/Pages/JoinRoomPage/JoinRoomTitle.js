import { Typography } from '@mui/material'
import React, { useEffect } from 'react'

const JoinRoomTitle = ({ isRoomHost }) => {

    const titleText = isRoomHost ? 'Host Meeting' : 'Join Meeting'
    useEffect(()=>{

    },[isRoomHost])
    return (
        
            // 
        <Typography fontSize='40px' mt='8%' textAlign='center' color='white' mb='5%' fontFamily={`'Black Ops One', cursive`}>{titleText}</Typography>
    )
}

export default JoinRoomTitle