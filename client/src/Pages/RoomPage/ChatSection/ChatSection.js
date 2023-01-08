import { Box } from '@mui/material'
import React from 'react'
import ChatLabel from './ChatLabel'
import Messages from './Messages'
import NewMessage from './NewMessage.js'
const ChatSection = () => {
  return (
    <Box bgcolor='#121b20' zIndex='150' width='100%' className='chat_section_container'>
      <ChatLabel/>
      <Messages/>
      <NewMessage/>
    </Box>
  )
}

export default ChatSection