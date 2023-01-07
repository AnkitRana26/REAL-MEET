import { setShowOverlay } from '../store/action';
import { store } from '../store/store';
import * as wss from './wss'
import Peer from 'simple-peer';

const defaultConstraints = {
    audio: true,
    video: {
        width: '480',
        height: '360'
    }
}

let localStream;


export const getLocalPreviewAndInitRoomConnection = async (isRoomHost, identity, roomId = null) => {

    navigator.mediaDevices.getUserMedia(defaultConstraints).then(stream => {
        console.log(stream, "Sucess");
        localStream = stream;
        showLocalVideoPreview(localStream);

        //dispatching Action to Stop Overlay
        store.dispatch(setShowOverlay(false));

        isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(identity, roomId);
    }).catch(err => {
        console.log(`Error Occurred when trying to get an access to local Stream`);
        console.log(err.message);
    });



}




let peers = {}
let streams = []

const getConfiguration = () => {
    return {
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302'
            }
        ]
    }
}

export const preparenewPeerConnection = (connUserSocketId, isInitiator) => {
    console.log('hello');
    const configuration = getConfiguration();
    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        config: configuration,
        stream: localStream
    });

    peers[connUserSocketId].on('signal', (data) => {

        //webRTC offer, webRTC Answer (SDP informations),ice candidates

        const signalData = {
            signal: data,
            connUserSocketId: connUserSocketId
        }
        wss.signalPeerData(signalData);

    })

    peers[connUserSocketId].on('stream', (stream) => {
        console.log('New Stream came');
        addStream(stream, connUserSocketId);
        streams = [...streams, stream];
    })

}


export const handleSingnalingData = (data) => {

    //add signaling data to peer connection
    peers[data.connUserSocketId].signal(data.signal);

}

export const removePeerConnection = (data) => {
    console.log('removing');
    const { socketId } = data;
    const videoContainer = document.getElementById(socketId);
    const videoEl = document.getElementById(`${socketId}-video`);

    if (videoContainer && videoEl) {
        const tracks = videoEl.srcObject.getTracks();
        tracks.forEach(t => t.stop());
        videoEl.srcObject = null;
        videoContainer.removeChild(videoEl);
        videoContainer.parentNode.removeChild(videoContainer);

        if (peers[socketId]) {
            peers[socketId].destroy();
        }

        delete peers[socketId];

    }




}



///////////////////////////////////////////// UI Videos ///////////////////////////////////////////////////////

const showLocalVideoPreview = (stream) => {
    const videosContainer = document.getElementById('videos_portal');
    videosContainer.classList.add('videos_portal_styles');
    const videoContainer = document.createElement('div');
    videoContainer.classList.add('video_track_container');
    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;

    videoElement.onloadedmetadata = () => {
        videoElement.play();

    }

    videoContainer.appendChild(videoElement);
    videosContainer.appendChild(videoContainer);
}


const addStream = (stream, connUserSocketId) => {
    //display incoming stream
    const videosContainer = document.getElementById('videos_portal');
    const videoContainer = document.createElement('div');
    videoContainer.id = connUserSocketId;
    videoContainer.classList.add('video_track_container');
    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.srcObject = stream;
    videoElement.id = `${connUserSocketId}-video`;

    videoElement.onloadedmetadata = () => {
        videoElement.play();
    }

    videoContainer.addEventListener('click', () => {
        console.log(videoElement.classList);
        if (videoElement.classList.contains('full_screen')) {
            videoElement.classList.remove('full_screen');
        }
        else {
            videoElement.classList.add('full_screen');
        }
    })

    videoContainer.appendChild(videoElement);
    videosContainer.appendChild(videoContainer);


}



////////////////////////////////////////////////////////Buttons Logic///////////////////////////////

export const toggleMic = (isMuted) => {

    localStream.getAudioTracks()[0].enabled = isMuted ? true : false;


}

export const toggleCamera = (isDiabled) => {
    localStream.getVideoTracks()[0].enabled = isDiabled ? true : false;
}


export const toggleScreenShare = (isScreenSharingActive, screenSharingStream = null) => {

    if (isScreenSharingActive) {
        switchVideoTracks(localStream);
    }
    else {
        switchVideoTracks(screenSharingStream);
    }



} 

const switchVideoTracks = (stream) => {

    for (let socket_id in peers) {
        for (let index in peers[socket_id].streams[0].getTracks()) {
            for (let index2 in stream.getTracks()) {

                if (peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind) {

                    peers[socket_id].replaceTrack(
                        peers[socket_id].streams[0].getTracks()[index],
                        stream.getTracks()[index2],
                        peers[socket_id].streams[0]
                    )

                    break;
                }
            }
        }
    }


}