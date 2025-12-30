import config from "./config";
import axios from "axios"

export async function loginUser(email,password){
    const URL=config.Base_URL+"/common/auth/login"
    const body={email,password};

    const response= await axios.post(URL,body)
    return response.data;
}

export async function userUpdatePassword(oldpassword,newpassword,confirmpassword) {
    const token = sessionStorage.getItem('token');
    const URL=config.Base_URL+"/student/changepassword"
    const body={oldpassword,newpassword,confirmpassword}

    const response= await axios.put(URL,body,{
        headers: {
          token: token
}});

    return response.data;
}

export async function registerUser(name,email,course_id,mobile_no){
    const URL = config.Base_URL + '/student/register-to-course'
    const body = {name,email,course_id,mobile_no}
    const response=await axios.post(URL,body)
    return response.data
}







export async function getMyRegisteredCourses() {
    const URL = config.Base_URL + '/student/my-courses'
    
    
    const email = sessionStorage.getItem("username")
    const token = sessionStorage.getItem("token") 

    
    const response = await axios.get(URL, {
        headers: { 
            'email': email,
            'token': token  
           
        }
    })
    return response.data
}



