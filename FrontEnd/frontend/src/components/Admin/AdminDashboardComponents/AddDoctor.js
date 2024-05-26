import React, { useState } from 'react';
import '../../../style/Admin/AddDoctor.css';
import Box from '@mui/material/Box';

function AddDoctor() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [specialization, setSpecializtion] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8082/admin/addDoctor', {
      method: 'POST',
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
      setName('');
        setCity('');
        setSpecializtion('');
        setRating(0);
    } else {
    }
  };
  return (
    <>
    <form onSubmit={handleSubmit}>
    <Box className="text-box6">
        <h2>Add Doctor</h2>
      <div style={{position:'fixed', left:510,top:200}}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div style={{position:'fixed', left:525,top:250}}>
        <label>City:</label>
        <input type="text" value={city} onChange={(event) => setCity(event.target.value)} />
      </div>
      <div style={{position:'fixed', left:453,top:300}}>
        <label>Specialization:</label>
        <input type="text" value={specialization} onChange={(event) => setSpecializtion(event.target.value)} />
      </div>
      <div style={{position:'fixed', left:507,top:350}}>
        <label>Rating:</label>
        <input type="number" value={rating} step="0.1" max={10.00} min={0.00} onChange={(event) => setRating(event.target.value)} />
      </div>
      
      <button type="submit" style={{position:'fixed', left:560,top:400}}>Add Doctor</button>
      </Box>
    </form>
    </>
  );
}

export default AddDoctor;
