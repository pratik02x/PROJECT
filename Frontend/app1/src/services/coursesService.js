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