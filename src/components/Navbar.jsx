import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './contextReducer';


export default function Navbar() {

  let data = useCart();
  const [cartView,setCartView]=useState();
  const navigate=useNavigate();
  const handleLogout= ()=>{
    localStorage.removeItem("authToken");
    navigate('/login');
  }

  const DIV=styled.div`
  .btn:hover{
    border:none;
    color:white;
    background-color:#35383d;
  }
  `

  return (
    <DIV>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="#">GoFood</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">Home</Link>
            </li>
            {
              (localStorage.getItem("authToken")) ? <li className="nav-item">
                <Link className="nav-link active fs-5" to="/myOrders">My Orders</Link>
              </li> : ""
            }
          </ul>
          {
            (!localStorage.getItem("authToken")) ? <div className='d-flex'>
              <Link className="btn" to="/login" style={{ border: "1px solid black", borderRadius: "10px" ,marginRight:"4px"}}>Login</Link>

              <Link className="btn" to="/createuser" style={{ border: "1px solid black", borderRadius: "10px" }}>SignUp</Link>
            </div> : <div>
              <div className='btn' style={{ border: "1px solid black", borderRadius: "10px" , marginRight:"4px"}} onClick={()=>{setCartView(true)}}>
                My cart 
                <Badge pill bg="dark" style={{marginLeft:"10px"}}>{data.length}</Badge>
              </div>
              {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

          
              <div className='btn' style={{ border: "1px solid black", borderRadius: "10px" }} onClick={handleLogout}>
                Logout
              </div>
            </div>
          }

        </div>
      </nav>
    </DIV>
  )
}
