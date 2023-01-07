import React, { useState } from 'react'
import SwitchImg from '../../../resources/images/switchToScreenSharing.svg'
import LocalScreenSharingPreview from './LocalScreenSharingPreview';
import * as webRTCHandler from '../../../utils/webRTCHandler'

const contraints = {
  audio: false,
  video: true
}


const SwitchToScreenSharingButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);
  const handleScreenShareToggle = async () => {

    if (!isScreenSharingActive) {
      let stream = null;
      try {

        stream = await navigator.mediaDevices.getDisplayMedia(contraints);

      } catch (err) {
        console.log("Error Occured");
      }

      if (stream) {
        setScreenSharingStream(stream);

        webRTCHandler.toggleScreenShare(isScreenSharingActive,stream);

        setIsScreenSharingActive(true);
        //execute here function to switch the video track which we are sending to other user
      } else {
        //switch for video track from camera
        webRTCHandler.toggleScreenShare(isScreenSharingActive);
        setIsScreenSharingActive(false);


        //stop screen share stream
        screenSharingStream.getTracks().forEach(t => t.stop());
        setScreenSharingStream(null);
      }

    }
    else{
      webRTCHandler.toggleScreenShare(isScreenSharingActive);
      screenSharingStream.getTracks().forEach(t => t.stop());
      setIsScreenSharingActive(null);
      setIsScreenSharingActive(false);



    }

  }
  return (
    <>
      <div className='video_button_container'>
        <img src={SwitchImg} onClick={handleScreenShareToggle} className='video_button_image' />
      </div>
      {isScreenSharingActive && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  )
}

export default SwitchToScreenSharingButton