import React from 'react'
import Navbar from './Navbar'

const WrapperComponent = ({children}) => {
  return (
    <>
        <Navbar/>
        {children}
    </>
  )
}

export default WrapperComponent