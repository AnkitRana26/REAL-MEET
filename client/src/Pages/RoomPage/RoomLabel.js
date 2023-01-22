import { Box } from '@mui/material';
import React from 'react'
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

const RoomLabel = ({ roomId }) => {



  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    toast.success('Copied To Clipboard', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }

  return (
    <>
      <Box bgcolor='#182329' className='room_label'>
        <p className='room_label_paragraph'>RoomId: <span onClick={copyToClipboard} className='roomIdCopyToClipboard'>{roomId}</span></p>
      </Box>
      <ToastContainer
        className="toaster"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  )
}



export default RoomLabel;