import { Box } from '@mui/material'
import React from 'react'
import Participants from './Participants'
import ParticipantsLabel from './ParticipantsLabel'

const ParticipantSection = () => {
  return (
    <Box height='100vh' sx={{backgroundColor:'#121b20'}}  zIndex='110' >
        <ParticipantsLabel/>
        <Participants/>
    </Box>
  )
}

export default ParticipantSection