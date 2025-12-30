import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { userUpdatePassword } from '../services/userServices';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
 
function UpdatePassword() {

    const [oldpassword,setoldpassword]=useState("");
    const [newpassword,setnewpassword]=useState("");
    const [confirmpassword,setconfirmpassword]=useState("");
    const navigate=useNavigate();

   const cupdatepassword=async ()=>{

    const result= await  userUpdatePassword(oldpassword,newpassword,confirmpassword);
    

    if(result.status=="success"){
      
        toast.success("password updated");
        navigate("/student");
    }
    else{
      toast.error(result.error)
    }

   }
  return (
    <div>
      <div
      className="d-flex justify-content-center align-items-center vh-100"
     style={{ backgroundColor: '#f0f8ff' }}
    >
      <div className="card p-4 shadow-lg" style={{ width: '400px', borderRadius: '15px' }}>
        <h3 className="text-center mb-4 text-primary">Update password</h3>

        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label fw-bold">
           Old Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputEmail"
            placeholder="Enter oldpassword"
            onChange={e => setoldpassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label fw-bold">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Enter new password"
            onChange={e => setnewpassword(e.target.value)}
          />
        </div>

          <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label fw-bold">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder=" confirm password"
            onChange={e => setconfirmpassword(e.target.value)}
          />
        </div>

        <div className="d-grid mb-3">
          <button className="btn btn-primary fw-bold" onClick={cupdatepassword}>
            Update
          </button>
        </div>

        
      </div>
    </div>
    </div>
  )
}

export default UpdatePassword
