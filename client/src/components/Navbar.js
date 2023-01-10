import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Logo from '../resources/images/tomeet.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Navbar.css'


const Navbar = () => {
    return (
        <Box className='navbar' sx={{ backgroundColor: '#051937', color: "white", padding: "30px 30px", fontFamily: `sans-serif`, display: 'flex', justifyContent: 'space-between' }}>
            <Link style={{ display: 'block', margin: 'auto', color: "white", textDecoration: 'none', fontSize: '25px', fontWeight: 'bold' }} to='/'>Home</Link>
            <img width='18%' src={Logo} />

            <a href='https://ranankit.com' style={{ display: 'block', margin: 'auto', color: "white", textDecoration: 'none', fontSize: '25px', fontWeight: 'bold' }} to='/'>
                About
            </a>

            <ToastContainer
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

        </Box >
    )
}

export default Navbar