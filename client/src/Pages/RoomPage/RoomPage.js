import React, { useEffect } from 'react'
import ChatSection from './ChatSection/ChatSection';
import ParticipantSection from './ParticipantSection/ParticipantSection';
import RoomLabel from './RoomLabel';
import VideoSection from './VideoSection/VideoSection';
import * as webRTCHandler from '../../utils/webRTCHandler';

import './RoomPage.css';
import { connect } from 'react-redux';
import Overlay from './Overlay';
import { Box } from '@mui/material';
const RoomPage = (props) => {
  const { roomId,identity,isRoomHost,showOverlay,connectOnlyWithAudio } = props;


  if(!isRoomHost&&!roomId){
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  }

  useEffect(()=>{
    webRTCHandler.getLocalPreviewAndInitRoomConnection(isRoomHost,identity,roomId,connectOnlyWithAudio);
  },[])



  return (
    <>
      <Box display='grid' gridTemplateColumns='20% 60% 20%'>
        <ParticipantSection />
        <VideoSection />
        <ChatSection />
        <RoomLabel roomId={roomId} />
        {showOverlay?<Overlay/>:""}
      </Box>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps,)(RoomPage);