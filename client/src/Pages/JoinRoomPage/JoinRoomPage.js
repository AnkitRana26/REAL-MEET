import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsRoomHost } from '../../store/action';
import { Box } from '@mui/material'
import Meet from '../../resources/images/meet.png'

import './JoinRoomPage.css'
import JoinRoomTitle from './JoinRoomTitle';
import JoinRoomContent from './JoinRoomContent';

const JoinRoomPage = (props) => {

  const { setIsRoomHostAction, isRoomHost } = props;

  const search = useLocation().search;

  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get('host');
    if (isRoomHost) {
      //Host Update in Redux 
      setIsRoomHostAction(true);
    }
    else {
      setIsRoomHostAction(false);
    }
  }, [])

  return (
    // <div className='join_room_page_container'>
    //   <div className='join_room_page_panel'>
    //         
    //   </div>
    // </div>
    <Box  display='grid' gridTemplateColumns='50% 50%' padding=' 20px 30px'>
      <img width='75%' style={{ margin: 'auto' }} src={Meet} />
      <Box>
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent />
      </Box>
    </Box>
  )
}

const mapStoreStateToProps = (state) => {
  return {
    ...state
  }
}


const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost))
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomPage)