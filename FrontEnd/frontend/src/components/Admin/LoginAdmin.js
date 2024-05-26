import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Admin/LoginAdmin.css';

function LoginAdmin() {
  let navigate=useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn,setLoggedIn] =useState(0);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // make a POST request to the Spring Boot API with the username and password
    fetch('http://localhost:8082/admin/verifyAdmin/'+username, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // redirect to another page if the credentials are correct
          return navigate('/adminDashboard');
        } else {
          setLoggedIn(1);
        }
      });
  };

  return (
    <>
    <h1>Login</h1>
    <form onSubmit={handleSubmit} className='form2'>
      <label>
        Username:
        <input type="text" value={username} placeholder="Username" onChange={handleUsernameChange} />
      </label><br></br><br></br>
      <label>
        Password:
        <input type="password" value={password} placeholder="Password" onChange={handlePasswordChange} />
      </label><br></br><br></br>
      <button type="submit">Log In</button>
      {loggedIn===1 && (
      <div>
        <h2>
          Invalid Credentials.
        </h2>
      </div>
      )}
    </form>
    </>
  );
}

export default LoginAdmin;
