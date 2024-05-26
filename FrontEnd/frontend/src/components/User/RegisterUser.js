import React, { useState } from 'react';
import '../../style/User/RegisterUser.css';


function RegisterUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8081/user/registerUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });

    if (response.ok) {
      setUsername('');
      setEmail('');
      setPassword('');
    } else {
    }
  };

  return (
    <>
    <h1>Register</h1>
    <form onSubmit={handleSubmit} className='form4'>
      <div style={{position:'fixed', left:640,top:300}}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div style={{position:'fixed', left:671,top:350}}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div style={{position:'fixed', left:640,top:400}}>
        <label>Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <button type="submit" style={{position:'fixed', left:740,top:450}}>Register</button>
    </form>
    </>
  );
}

export default RegisterUser;
