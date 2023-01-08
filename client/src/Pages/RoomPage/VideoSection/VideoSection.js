import { Box } from '@mui/material'
import React from 'react'
import VideoButtons from './VideoButtons'

const VideoSection = () => {
  return (
    <Box bgcolor='#182329'  display='flex' justifyContent='center' >
        <VideoButtons/>
        <Box bgcolor='#182329' padding='5px'  display='grid' gridTemplateColumns='50% 50%' justifyItems='center' mt='0%'  gap='10px'  width='97%'  height='60%'  zIndex='150' id='videoDisplay' >
          
        </Box>
    </Box>
  )
}

export default VideoSection