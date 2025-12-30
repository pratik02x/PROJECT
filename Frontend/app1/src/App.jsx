
import {Routes,Route, Navigate, useLocation, Router} from "react-router"
// import './App.css'
import Home from './pages/Home'
import Login from "./pages/Login"
import AboutUs from "./pages/AboutUs"
import Student from "./pages/student"
import Mycourses from "./pages/Mycourses"
import Register from "./pages/Register"
import UpdatePassword from "./pages/UpdatePassword"
import { ToastContainer } from "react-toastify"
import { createContext, useState } from "react"
import Navbar from "./component/Navbar"
import Footer from "./component/Footer"
import CourseDetails from "./pages/Coursedetails"
import CourseContent from "./pages/CourseContent"
import GetAllCourses from "./pages/Admin/GetAllCourses"
import AddCourse from "./pages/Admin/AddCourse"

export const LoginContext=createContext();
function App() {
  const[loginstatus,setloginstatus]=useState(false);
  const [username, setusername] = useState("");
  const[userrole,setuserrole]=useState("");

  const location=useLocation();
  const hideNavbar=location.pathname=="/login" || location.pathname=="/register" || location.pathname=="/updatepassword"
  
  return (
    <div>

    <LoginContext.Provider value={{loginstatus,setloginstatus,username,setusername,userrole,setuserrole}}>
       
      
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
       
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/course-details/:id" element={<CourseDetails />} />
          <Route path="/updatepassword" element={<UpdatePassword/>}/>
          <Route path="/student" element={loginstatus ? <Student/> : <Navigate to="/home"/>}/>
          <Route path="/mycourses" element={loginstatus ? <Mycourses/> : <Navigate to="/home"/>}/>
          <Route path="course-content" element={<CourseContent/>} />
          <Route path="getcourses" element={<GetAllCourses/>}/>
          <Route path="addcourse" element={<AddCourse/>}/>
        </Routes>
        <ToastContainer/>
       
        <Footer/>
  
    </LoginContext.Provider>
    </div>
  )
}

export default App
