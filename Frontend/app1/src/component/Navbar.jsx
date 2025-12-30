import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

function Navbar() {
  const { loginstatus, setloginstatus, username, userrole } = useContext(LoginContext);
  const navigate = useNavigate();

  const logout = () => {
    setloginstatus(false);
    navigate("/home");
  };

  const changepassword = () => {
    navigate("/updatepassword");
  };

  const getcourses=()=>{
    navigate("/getcourses");
  }

  return (
    <>

      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#00bcd4' }}>
        <div className="container-fluid">
          <Link className="navbar-brand text-white fw-bold" to="/home">
            {loginstatus && userrole === 'admin' ? "Student Portal" : "Sunbeam Institute"}
          </Link>

          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav me-auto">
              <li className="nav-item ms-3">
                <Link className="nav-link text-white" to="/home">Home</Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link text-white" to="/aboutus">About</Link>
              </li>

              {/* Only Student */}
              {loginstatus && userrole === 'student' && (
                <li className="nav-item ms-3">
                  <Link className="nav-link text-white" to="/mycourses">My Courses</Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav ms-auto">
              {!loginstatus ? (
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold" to="/login">Login</Link>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle text-white fw-bold border rounded px-2"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{ cursor: "pointer" }}
                  >
                    {username}
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><button className="dropdown-item" onClick={changepassword}>Update Password</button></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={logout}>Sign Out</button></li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

    {/* only admin second bar */}
      {loginstatus && userrole === 'admin' && (
        <nav className="navbar navbar-expand-lg py-0" style={{ backgroundColor: '#0d6efd' }}>
          <div className="container-fluid justify-content-center">
            <ul className="navbar-nav flex-row">
              <li className="nav-item px-3">
                <Link className="nav-link text-white fw-bold" to="/dashboard">Dashboard</Link>
              </li>
              
              <li className="nav-item dropdown px-3">
                <span className="nav-link dropdown-toggle text-white fw-bold" role="button" data-bs-toggle="dropdown">
                  Courses
                </span>
                <ul className="dropdown-menu">
                  <li>
                  <button className="dropdown-item" onClick={getcourses}>Get All Courses</button></li>
                  <li><Link className="dropdown-item" to="/addcourse">Add Courses</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown px-3">
                <span className="nav-link dropdown-toggle text-white fw-bold" role="button" data-bs-toggle="dropdown">
                  Videos
                </span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/addcourse">Get All Videos</Link></li>
                  <li><Link className="dropdown-item" to="/managestudents">Add Videos</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown px-3">
                <span className="nav-link dropdown-toggle text-white fw-bold" role="button" data-bs-toggle="dropdown">
                  Students
                </span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/addcourse">Get All Studens</Link></li>
                  
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;