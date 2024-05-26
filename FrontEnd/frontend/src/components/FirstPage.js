import React from 'react'
import { NavLink } from 'react-router-dom'
import '../style/FirstPage.css';
import imagebackground from '../images/Hospital_Background.webp';
import logo from '../images/fracto_logo1.png';
import Box from '@mui/material/Box';

function FirstPage() {
  return (
    <div className="container" style={{backgroundImage:`url(${imagebackground})`,
    backgroundRepeat:'no-repeat',backgroundSize:"cover" ,
    width:1395,height:655}}>
      <img className='image1' src={logo} alt='none'></img>
        <Box className="text-box">
            <div className='heading5'>WELCOME TO FRACTO</div>
        <div className='container2' style={{backgroundImage:`url(${logo})`,width:550, height:300}}></div>
        <button className="redirect-home"><NavLink to="/home">Get Started</NavLink></button>
        
        </Box>
    </div>
  )
}

export default FirstPage