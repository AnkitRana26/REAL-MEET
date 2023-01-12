import axios from 'axios';

const serverApi = 'https://real-meet-server-6fw7q4uwy-ankitrana26.vercel.app/';

export const getRoomExists =async (roomId)=>{
    const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
    return response.data;
}


