import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import '../../../style/User/Booking.css';
import logo from '../../../images/fracto_logo1.png';

export default function Booking() {
    
    let location = useLocation();
    let navigate=useNavigate();
  const doctorname=location.state.name;
  const username="";
  const status="";
  const date=location.state.date;
  const timings=location.state.book;
  const [check,setCheck] = useState(0);
  const handleBooking = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8081/user/addAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        doctorname,
        date,
        timings,
        status
      })
    });

    if (response.ok) {
      return navigate("/userDashboard");
    } else {
      setCheck(1);
    }
  };
  return (
    <div>
       <img className='image1' src={logo} alt='none'></img>
      <Box className="text-box3">
      <h1>Confirm a Booking with:{doctorname} </h1>

     <h1>Booking Date:{date} </h1> 
     <h1>Booking Time:{timings}</h1>
     <button value="submit" onClick={handleBooking} className='confirmBook'>Confirm Booking</button><br></br><br></br>
     <button className='dashBoard'><NavLink to="/userDashboard">Back to Dash Board</NavLink></button>
     </Box>
     {check===1 && (
      <div>
        <h2 className='heading3'>
          Something went Wrong
        </h2>
      </div>
      )}
     </div>
  )
}
