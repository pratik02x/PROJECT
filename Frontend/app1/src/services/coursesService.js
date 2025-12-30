import config  from "./config";
import axios from "axios";

export async function getcourses() {
    const URL = config.Base_URL + "/admin/course/all-courses";
    
   
    const token = sessionStorage.getItem("token");

    
    const response = await axios.get(URL, {
        headers: {
            'token': token 
        }
    });

    console.log(response.data);
    return response.data;
}



//getcourseVideos
export async function getCourseVideos() {
    const URL = config.Base_URL + '/student/my-coursewith-videos'
    
   
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

//update courses

export async function updateCourse(id, courseData) {
    const URL = config.Base_URL + `/admin/course/update/${id}`;
    const token = sessionStorage.getItem("token");

    const response = await axios.put(URL, courseData, {
        headers: {
            'token': token
        }
    });

    return response.data;
}

