import config  from "./config";
import axios from "axios";

export async function getcourses(){
    const URL=config.Base_URL+"/common/course/all-active-course";
    
    const response= await axios.get(URL);
    return response.data;
}

// coursesService.js madhe


export async function getCourseVideos() {
    const URL = config.Base_URL + '/student/my-coursewith-videos'
    
    // Session storage madhun email ani token ghyava
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




export async function addCourse(formData) {
    // Backend la /course prefix dila aslyamule URL asa hoil:
    const URL = config.Base_URL + "/admin/add"; 
    const token = sessionStorage.getItem("token");

    const response = await axios.post(URL, formData, {
        headers: { 
            'token': token,
            'Content-Type': 'multipart/form-data' 
        }
    });
    return response.data;
}
