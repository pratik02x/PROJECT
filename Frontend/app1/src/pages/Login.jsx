import React ,{ useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { loginUser } from '../services/userServices';
import { LoginContext } from '../App';
import { useContext } from 'react';
import Navbar from '../component/Navbar';
function Login() {
   
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    const{loginstatus,setloginstatus}=useContext(LoginContext);
    const{username,setusername}=useContext(LoginContext);
    const{userrole,setuserrole}=useContext(LoginContext)
    const signin=async (event)=>{

    const result= await loginUser(email,password);
        if(email==""){
            toast.warn("email required")
        }
        else if(password==""){
            toast.warn("password required")
        }
        else{
        if(result.status=="success"){
            
            sessionStorage.setItem("token",result.data.token);
            sessionStorage.setItem("username", result.data.email);
            console.log(sessionStorage.getItem("username"))

            setloginstatus(true);
            setusername(result.data.email)
            setuserrole(result.data.role)
            navigate("/home");
            toast.success("login successfull");
        }
        else{
            toast.error(result.error);
        }
    }

    }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
     style={{ backgroundColor: '#f0f8ff' }}
    >
      <div className="card p-4 shadow-lg" style={{ width: '400px', borderRadius: '15px' }}>
        <h3 className="text-center mb-4 text-primary">Sign In</h3>

        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label fw-bold">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label fw-bold">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Enter your password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="d-grid mb-3">
          <button className="btn btn-primary fw-bold" onClick={signin}>
            Sign In
          </button>
        </div>

        <p className="text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-decoration-none text-primary fw-bold">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
