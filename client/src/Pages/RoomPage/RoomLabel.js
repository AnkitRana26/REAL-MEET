import { Box } from '@mui/material';
import React from 'react'
import {connect} from 'react-redux';

const RoomLabel = ({roomId}) => {
    
  return (
    <Box bgcolor='#182329' className='room_label'>
        <p className='room_label_paragraph'>RoomId: {roomId}</p>
    </Box>
  )
}



export default RoomLabel;