import { Box, Typography } from '@mui/material';
import React from 'react'
import { connect } from 'react-redux';




const SingleParticipant = (props) => {
    const { identity, lastItem, particpant } = props;

    return <Box className='participantsName' sx={{backgroundColor:'#121b20'}} >
        <Box sx={{backgroundColor:'#121b20'}} display='flex' justifyContent='space-between' alignItems='center' padding='5px 10px'>
            <Typography sx={{backgroundColor:'#121b20'}}  color='white' variant='h6' textAlign='center'>{identity}</Typography>
            <i style={{color:'white'}} class="fa-solid fa-user"></i>
        </Box>
        
    </Box>
}


const Participants = (props) => {
    const {participants} = props;
    return (
        <Box mt='10%'>
            {
                participants.map((participant, index) => {
                    return <SingleParticipant key={participant.identity} lastItem={participants.length == index + 1} participant={participant} identity={participant.identity} />
                })
            }
        </Box>
    )
}

const mapStoreStateToProps =(state)=>{
    return{
        ...state
    }
}


export default connect(mapStoreStateToProps)(Participants);