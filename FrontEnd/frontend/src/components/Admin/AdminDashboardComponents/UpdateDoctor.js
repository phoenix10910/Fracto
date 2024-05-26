import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import logo from '../../../images/fracto_logo1.png';


function UpdateDoctor() {
  const location=useLocation();
  const navigate=useNavigate();
  const [name, setName] = useState(location.state.name);
  const [city, setCity] = useState(location.state.city);
  const [specialization, setSpecializtion] = useState(location.state.specialization);
  const [rating, setRating] = useState(location.state.rating);
  const [check,setCheck] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8082/admin/updateDoctor/'+name, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        city,
        specialization,
        rating
      })
    });

    if (response.ok) {
      return navigate("/adminDashboard")
    } else {
      setCheck(1);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <img className='image1' src={logo} alt='none'></img>
      <Box className="text-box6">
        <h2>Update Doctor</h2>
      <div style={{position:'fixed', left:510,top:200}}>
        <label>Doctor Name:</label>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div style={{position:'fixed', left:525,top:250}}>
        <label>Doctor City:</label>
        <input type="text" value={city} onChange={(event) => setCity(event.target.value)} />
      </div>
      <div style={{position:'fixed', left:453,top:300}}>
        <label>Doctor Specialization:</label>
        <input type="text" value={specialization} onChange={(event) => setSpecializtion(event.target.value)} />
      </div>
      <div style={{position:'fixed', left:507,top:350}}>
        <label>Doctor Rating:</label>
        <input  type="number" value={rating} step="0.1" max={10.00} min={0.00} onChange={(event) => setRating(event.target.value)} />
      </div>
      <button type="submit" style={{position:'fixed', left:560,top:400}}>Update Doctor Details</button><br></br>
      <button style={{position:'fixed', left:560,top:450}}><NavLink to='/adminDashboard'>Back To Home Page</NavLink></button>
      {check===1 && (
      <div>
        <h2>
          Something went wrong
        </h2>
      </div>
      )}
      </Box>
    </form>
  );
}

export default UpdateDoctor;
