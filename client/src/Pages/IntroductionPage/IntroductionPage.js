import React from 'react'
import ConnectingButtons from './ConnectingButtons'
import logo from '../../resources/images/logo.png'
import './IntroductionPage.css'
import { Box, Button, Typography } from '@mui/material'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Logo from '../../resources/images/tomeetFull.png'
import { useNavigate } from 'react-router-dom'
const IntroductionPage = (props) => {

  const history = useNavigate()
  const pushToJoinRoomPage = () => {
    history('/join-room');
  }

  const pushToJoinRoomPageAsHost = () => {
    history('join-room?host=true');
  }


  const handleDragStart = (e) => e.preventDefault();
  const items = [
    <div><img style={{ display: 'block', margin: 'auto', height: '450px', width: '450px',borderRadius:'50%' }} src="https://i.pinimg.com/originals/50/83/e0/5083e0a2a7dcaae07c142e8b87036a27.gif" onDragStart={handleDragStart} role="presentation" /></div>,
    <div><img style={{ display: 'block', margin: 'auto', height: '450px', width: '450px' }} src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg" onDragStart={handleDragStart} role="presentation" /></div>,
    <div><img style={{ display: 'block', margin: 'auto', height: '450px', width: '450px' }} src="https://www.gstatic.com/meet/user_edu_scheduling_light_b352efa017e4f8f1ffda43e847820322.svg" onDragStart={handleDragStart} role="presentation" /></div>,
    <div><img style={{ display: 'block', margin: 'auto', height: '450px', width: '450px' }} src="https://www.gstatic.com/meet/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg" onDragStart={handleDragStart} role="presentation" /></div>,
  ];
  const responsive = {
    0: { items: 1, itemsFit: 'contain' }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '55% 45%', padding: '0px 20px', mt: '5%', alignItems: 'center' }}>
      <Box justifyContent='center' padding='10px' color='white' height='100%'>
        <img width="40%" style={{ margin: 'auto', marginTop: '8%', marginBottom: '2%', display: 'block' }} src={Logo} />
        <Typography textAlign='center' variant='h3'>Connecting You To Loved Ones</Typography>
        <Box display='flex' gap='20px' justifyContent='center'>
          <button className='joinButtons' onClick={pushToJoinRoomPage} style={{ backgroundColor: 'green', color: 'white', fontSize: '20px', padding: '15px', width: '30%', border: 'none', outline: 'none', boxShadow: '0 0 3px white', marginTop: '5%' }} >
            Join Connection
          </button>
          <button className='joinButtons' onClick={pushToJoinRoomPageAsHost} style={{ backgroundColor: '#5dbea3', color: 'white', fontSize: '20px', padding: '15px', width: '30%', border: 'none', outline: 'none', boxShadow: '0 0 3px white', marginTop: '5%' }} >
            Create Connection
          </button>

        </Box>
      </Box>
      <Box width="80%" display='flex' justifyContent='right' alignItems='center' >
        {/* <img width="100%" style={{ borderRadius: '0px 13px 13px 13px', display: 'block', float: 'right' }} src='https://i.pinimg.com/originals/50/83/e0/5083e0a2a7dcaae07c142e8b87036a27.gif' /> */}
        <AliceCarousel disableButtonsControls disableDotsControls animationDuration={1000} autoPlayInterval={2000} responsive={responsive} infinite autoHeight autoWidth autoPlay className="styleStyle" mouseTracking items={items} />
      </Box>
    </Box>
  )
}

export default IntroductionPage



{/* <div className='introduction_page_container'>
      <div className='introduction_page_panel'>
        <img src={logo} className='introduction_page_image' />
        <ConnectingButtons/>
      </div>  
    </div> */}