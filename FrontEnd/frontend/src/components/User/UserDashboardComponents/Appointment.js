import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import '../../../style/User/Appointment.css';
import logo from '../../../images/fracto_logo1.png';

function Appointment() {
  let location = useLocation();
  const doctorname=location.state.name;
  const date=location.state.date;
  const [timings, setTimings] = useState([]);
  const[booking,setBooking]=useState('');
  const [selectedButton, setSelectedButton] = useState(null);
  const [check,setCheck] = useState(0);

  const first=()=>{
    fetch('http://localhost:8081/user/getAppointment/'+doctorname+'/'+date)
      .then(response => response.json())
      .then((data) => setTimings(data))
      .catch(error => console.error(error));
  };
  // Fetch data from Spring Boot and update the state
  useEffect(() => {
    first();

  });

  const handleSubmit =() =>{
    if(selectedButton)
    {
      setCheck(1);
    }
    else{
      setCheck(2);
    }
};

  const handleBooking= (event) => {
    setCheck(1);
    event.preventDefault();
    setBooking(event.target.value);
    setSelectedButton(event.target.value);
    console.log(event.target.value);
  };
  // Create an array of hour strings from 9.00 am to 6.00 pm
  const hours = [...Array(9)].map((_, i) => `${i + 9}:00`);

  // Render the buttons for each hour with disabled state for timings already present in records
  return (
    <div>
      <h1>{doctorname}</h1>
      <img className='image1' src={logo} alt='none'></img>
      <Box className="booking">
        <div className='booking1'>
          <h2>Book Slot</h2>
          
          
      {hours.map((hour,i) => {
        const timeSlot = `${hour} - ${i + 10}:00`;
        const isDisabled = timings.includes(hour);
        
        return (  <>
          <button className='book' value={hour} key={hour} disabled={isDisabled} onClick={handleBooking} style={{borderColor: selectedButton === hour ? 'blue' : 'white'}}>{timeSlot}</button><br></br>  <br></br>
            </>            
        );  
            
       })}
        
       
      <br></br><button className='book1' onClick={handleSubmit}>< NavLink style={{pointerEvents: booking ? '' : 'none'}} to="/booking"  state={{name:doctorname,date:date,book:booking}}>Confirm Book</NavLink ></button><br></br><br></br>
      <button className='book2'><NavLink to="/userDashboard">Back to Dash Board</NavLink></button>
      </div>
      {check===2 && (
      <div>
        <h2 className='heading3' style={{color:'darkblue'}}>
          Enter Time
        </h2>
      </div>
      )}
      </Box>
      
    </div>
  );
}

export default Appointment;
