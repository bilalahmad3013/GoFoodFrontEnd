import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {  useNavigate} from 'react-router-dom';

export default function SignUp() {
  
  const navigate=useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geoLocation: ""
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const response = await fetch("https://gofoodbackend121.onrender.com/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geoLocation
        })
      });
      const json = await response.json();
      const error=json.error;
      if(!json.success){
         if(error){
          alert("Email already exists");
         }
        else{
        alert("Enter valid credentials");
        }
      }
      else{
        navigate('/login');
        alert("SignUp Successfully");
      }
   
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="name" className="form-control" name="name" value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Location</label>
            <input type="text" className="form-control" id="exampleInputPassword1" name="geoLocation" value={credentials.geoLocation} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to={'/login'} className='m-3 btn btn-danger'>Already a User</Link>
        </form>
      </div>
    </>
  );
}
