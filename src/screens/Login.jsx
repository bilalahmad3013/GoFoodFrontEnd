import React from 'react'
import { useState  } from 'react';
import { Link , useNavigate} from 'react-router-dom';
export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",

  });
  const navigate=useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://gofoodbackend121.onrender.com/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,

      })
    });
    const json = await response.json();
    if (!json.success) {
      alert("Enter valid credentials");
    }
    else {
      
      alert("Login Successfully");
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate('/');
    }

  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to={'/createuser'} className='m-3 btn btn-danger'>Create User</Link>
      </form>
    </div>
  )
}
