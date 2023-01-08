import { Checkbox } from '@mui/material';
import React from 'react'
import checkImg from '../../resources/images/check.png'

const OnlyWithAudioCheckbos = ({ connectOnlyWithAudio, setConnectOnlyWithAudio }) => {

  const handleConnectionTypeChange = () => {
    setConnectOnlyWithAudio(!connectOnlyWithAudio);
  }
  const label = { inputProps: { 'aria-label': 'Connect With Audio Only' } };
  return (
    <div className='checkbox_container'>
      <div className='checkbox_connection' onClick={handleConnectionTypeChange}>
        <input className='checkboxInput' type='checkbox' />
      </div>
      <p className='checkbox_container_paragraph'>Only audio</p>
    </div>
  )
}

export default OnlyWithAudioCheckbos