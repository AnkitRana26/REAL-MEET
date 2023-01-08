import { Box, Typography } from '@mui/material'
import React from 'react'

const ParticipantsLabel = () => {
  return (
    <Box sx={{backgroundColor:'#121b20'}}>
          <Typography sx={{backgroundColor:'#121b20',fontWeight:'bold'}} variant='h6' p='5px' textAlign='center' mt='3%'  borderBottom='1px solid white' style={{color:"white"}}>Participants</Typography>
    </Box>
  )
}

export default ParticipantsLabel