import axios from 'axios';

const serverApi = 'https://real-meet-server.onrender.com/api';

export const getRoomExists =async (roomId)=>{
    const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
    return response.data;
}


