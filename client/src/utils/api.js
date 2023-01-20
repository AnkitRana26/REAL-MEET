import axios from 'axios';

const serverApi = 'https://realmeet.up.railway.app/api';

export const getRoomExists =async (roomId)=>{
    const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
    return response.data;
}


