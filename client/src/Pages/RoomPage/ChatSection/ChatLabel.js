import { Box, Typography } from '@mui/material'
import React from 'react'

const ChatLabel = () => {
  return (
    <Box bgcolor='#121b20' className='chat_label_container'>
        <Typography sx={{backgroundColor:'#121b20',fontWeight:'bold',width:'100%'}} variant='h6' p='5px' textAlign='center' mt='3%'  borderBottom='1px solid white' style={{color:"white"}}>Chat</Typography>
    </Box>
  )
}

export default ChatLabel