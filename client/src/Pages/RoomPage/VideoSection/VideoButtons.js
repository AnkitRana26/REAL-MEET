import { Box } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import CameraButtons from './CameraButtons'
import LeaveRoomButton from './LeaveRoomButton'
import MicButton from './MicButton'
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton'

const VideoButtons = ({connectOnlyWithAudio}) => {
  return (
    <Box sx={{position:'fixed',bottom:'0px',display:'flex',justifyContent:'center',border:'1px solid white',width:'50%',left:'25%%',zIndex:'120',padding:'1%',borderRadius:'5px',backgroundColor:'#121b20'}}>
        <MicButton/>
        {!connectOnlyWithAudio&&<CameraButtons/>}
        <LeaveRoomButton/>
        {!connectOnlyWithAudio&&<SwitchToScreenSharingButton/>}
    </Box>
  )
}


const mapStoreStateToProps =(state)=>{
  return {
    ...state
  }
}

export default connect(mapStoreStateToProps)(VideoButtons)