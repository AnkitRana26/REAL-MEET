import React, { useEffect } from 'react'
import ChatSection from './ChatSection/ChatSection';
import ParticipantSection from './ParticipantSection/ParticipantSection';
import RoomLabel from './RoomLabel';
import VideoSection from './VideoSection/VideoSection';
import * as webRTCHandler from '../../utils/webRTCHandler';

import './RoomPage.css';
import { connect } from 'react-redux';
import Overlay from './Overlay';
const RoomPage = (props) => {
  const { roomId,identity,isRoomHost,showOverlay,connectOnlyWithAudio } = props;

  useEffect(()=>{
    webRTCHandler.getLocalPreviewAndInitRoomConnection(isRoomHost,identity,roomId,connectOnlyWithAudio);
  },[])



  return (
    <>
      <div className='room_container'>
        <ParticipantSection />
        <VideoSection />
        <ChatSection />
        <RoomLabel roomId={roomId} />
        {showOverlay?<Overlay/>:""}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps,)(RoomPage);