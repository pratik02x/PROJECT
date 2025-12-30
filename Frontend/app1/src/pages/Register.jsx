import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { registerUser } from '../services/userServices'
import { useLocation } from 'react-router'

function Register() {
    const location = useLocation();
    const initialCourseId = location.state?.course_id || '';
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [course_id, setcourse_id] = useState('')
  
  const [mobile_no, setmobile_no] = useState('')
  const navigate = useNavigate()

  const signup = async () => {
    if (name === '')
      toast.warn('name must be entered')
    else if (email === '')
      toast.warn('email must be entered')
    else if (course_id === '')
      toast.warn('course id must be entered')
    else {
      const result = await registerUser(name, email, course_id, mobile_no)
      if (result.status === 'success') {
        navigate('/login')
        toast.success('user registered successfully')
      } else {
        toast.error(result.error)
      }
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#f0f8ff' }}
    >
      <div className="card p-4 shadow-lg" style={{ width: '400px', borderRadius: '15px' }}>
        <h3 className="text-center mb-4 text-primary">Register</h3>

        <div className="mb-3">
          <label htmlFor="inputName" className="form-label fw-bold">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter name"
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label fw-bold">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Enter email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputCourse" className="form-label fw-bold">
            Course ID
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCourse"
            placeholder="Enter course id"
            onChange={e => setcourse_id(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputMobile" className="form-label fw-bold">
            Mobile
          </label>
          <input
            type="tel"
            className="form-control"
            id="inputMobile"
            placeholder="Enter mobile number"
            onChange={e => setmobile_no(e.target.value)}
          />
        </div>

        <div className="d-grid mb-3">
          <button className="btn btn-primary fw-bold" onClick={signup}>
            Sign Up
          </button>
        </div>

        <p className="text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-decoration-none text-primary fw-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
