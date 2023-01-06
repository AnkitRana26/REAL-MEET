import { setShowOverlay } from '../store/action';
import {store} from '../store/store';
import * as wss from './wss'

const defaultConstraints = {
    audio:true,
    video:true
}

let localStream;


export const getLocalPreviewAndInitRoomConnection =async(isRoomHost,identity,roomId=null)=>{

    navigator.mediaDevices.getUserMedia(defaultConstraints).then(stream=>{
        console.log(stream,"Sucess");
        localStream=stream;
        showLocalVideoPreview(localStream);

        //dispatching Action to Stop Overlay
        store.dispatch(setShowOverlay(false));

        isRoomHost ? wss.createNewRoom(identity):wss.joinRoom(identity,roomId);
    }).catch(err=>{
        console.log(`Error Occurred when trying to get an access to local Stream`);
        console.log(err.message);
    });



}

const showLocalVideoPreview =(stream)=>{

}