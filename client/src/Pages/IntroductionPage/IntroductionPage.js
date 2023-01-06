import React from 'react'
import logo from '../../resources/images/logo.png'
import './IntroductionPage.css'
const IntroductionPage = (props) => {
  return (
    <div className='introduction_page_container'>
      <div className='introduction_page_panel'>
        <img src={logo} className='introduction_page_image' />
      </div>  
    </div>
  )
}

export default IntroductionPage