import React from 'react'
import CameraButtons from './CameraButtons'
import LeaveRoomButton from './LeaveRoomButton'
import MicButton from './MicButton'
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton'

const VideoButtons = (props) => {
  return (
    <div className='video_buttons_container'>
        <MicButton/>
        <CameraButtons/>
        <LeaveRoomButton/>
        <SwitchToScreenSharingButton/>
    </div>
  )
}

export default VideoButtons