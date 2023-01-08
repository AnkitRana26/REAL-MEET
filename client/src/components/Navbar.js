import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Logo from '../resources/images/tomeet.png'
const Navbar = () => {
    return (
        <Box sx={{backgroundColor:'#051937', color: "white", padding: "30px 30px", fontFamily: `sans-serif`, display: 'flex', justifyContent: 'space-between' }}>
            <Link style={{ display: 'block', margin: 'auto', color: "white", textDecoration: 'none', fontSize: '25px',fontWeight:'bold' }} to='/'>Home</Link>
            <img width='18%' src={Logo} />

            <Link style={{ display: 'block', margin: 'auto', color: "white", textDecoration: 'none', fontSize: '25px',fontWeight:'bold' }} to='/'>
                Login
            </Link>
        
        </Box >
    )
}

export default Navbar