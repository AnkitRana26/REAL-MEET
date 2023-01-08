import { setMessage, setShowOverlay } from '../store/action';
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

const onlyAudioConstraints = {
    audio: true,
    video: false
}

let localStream;


export const getLocalPreviewAndInitRoomConnection = async (isRoomHost, identity, roomId = null, onlyAudio) => {


    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        console.log(stream, "Sucess");
        localStream = stream;
        showLocalVideoPreview(localStream);

        //dispatching Action to Stop Overlay
        store.dispatch(setShowOverlay(false));

        isRoomHost ? wss.createNewRoom(identity, onlyAudio) : wss.joinRoom(identity, roomId, onlyAudio);
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
            },
            {
                urls: "stun:relay.metered.ca:80",
            },
            {
                urls: "turn:relay.metered.ca:80",
                username: process.env.REACT_APP_TURN_USERNAME,
                credential: process.env.REACT_APP_TURN_CREDINTIALS,
            },
            {
                urls: "turn:relay.metered.ca:443",
                username: process.env.REACT_APP_TURN_USERNAME,
                credential: process.env.REACT_APP_TURN_CREDINTIALS,
            },
            {
                urls: "turn:relay.metered.ca:443?transport=tcp",
                username: process.env.REACT_APP_TURN_USERNAME,
                credential: process.env.REACT_APP_TURN_CREDINTIALS,
            }
        ]
    }



}


const messengerChannel = 'messenger';

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
        streams = [...streams, stream];
        let identity;
        addStream(stream, connUserSocketId);
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
    const videosContainer = document.getElementById('videoDisplay');
    // videosContainer.classList.add('videos_portal_styles');
    const videoContainer = document.createElement('div');
    videoContainer.classList.add('video_track_container');
    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;
    const userName = document.createElement('p');
    userName.innerText= store.getState().identity;
    userName.className='userNameShow'

    videoElement.onloadedmetadata = () => {
        videoElement.play();

    }

    if (store.getState().connectOnlyWithAudio) {
        videoContainer.append(getAudioOnlyLabel(store.getState().identity));
    }
    else {
        videoContainer.append(videoElement,userName);
    }

    videosContainer.appendChild(videoContainer);
}


const addStream = (stream, connUserSocketId) => {

    //check if we have connected with audio
    const participants = store.getState().participants;
    const participant = participants.find(p => p.socketId === connUserSocketId);


    //display incoming stream
    const videosContainer = document.getElementById('videoDisplay');
    const videoContainer = document.createElement('div');
    const userName = document.createElement('p');
    userName.innerText= participant.identity;
    
    userName.className='userNameShow'
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




    // console.log(participant);
    if (participant?.onlyAudio) {
        videoContainer.appendChild(getAudioOnlyLabel(participant.identity));
    } else {
        videoContainer.append(videoElement,userName);
    }

    videosContainer.appendChild(videoContainer);





}

const getAudioOnlyLabel = (name) => {
    

    const label = document.createElement('p');
    label.classList.add('label_only_audio_text');
    label.innerHTML = name;

    
    return label;
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

/////////////////////////////////////////////////Messages//////////////////////////////////

const appendNewMessage = (messageData) => {
    const messages = store.getState().messages;
    store.dispatch(setMessage([...messages, messageData]));
}


export const sendMessageUsingDataChannel = (message) => {
    //append this message locally
    const identity = store.getState().identity;

    const localMessageData = {
        content: message,
        identity,
        messageCreatedByMe: true
    }

    appendNewMessage(localMessageData);

    const messageData = {
        content: message,
        identity
    }

    const stringifiedMessageData = JSON.stringify(messageData);

    wss.sendDataToConnectedUser(stringifiedMessageData);


}