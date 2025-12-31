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

export async function deleteCourse(id){
    const URL=config.Base_URL+`/admin/course/delete/${id}`;
    const  token=sessionStorage.getItem(`token`);

    const response= await axios.delete(URL,{
        headers: {
            'token': token
        }
    });
   return  response.data;
}

export async function getVideos(){
    const URL=config.Base_URL+"/admin/all-videos";
    const token=sessionStorage.getItem('token');
    const response= await axios.get(URL,{
        
            headers:{
                   'token': token
            }
        
    });
    return response.data;
}

export async function deleteVideo(id){
    const URL=config.Base_URL+`/admin/video/delete/${id}`
    const token=sessionStorage.getItem('token');

    const response= await axios.delete(URL,{
        headers:{
            'token':token
        }
    });

    return response.data;
}

export async function updateVideo(id, videoData) {
    const URL = config.Base_URL + `/admin/video/update/${id}`;
    const token = sessionStorage.getItem("token");

    const response = await axios.put(URL, videoData, {
        headers: {
            'token': token
        }
    });

    return response.data;
}

export async function addVideo(videoData) {
    const URL = config.Base_URL + `/admin/video/add`; 
    const token = sessionStorage.getItem("token");

    const response = await axios.post(URL, videoData, {
        headers: {
            'token': token
        }
    });

    return response.data;
}




export async function getAllStudents() {
    const URL = config.Base_URL + '/admin/students/all';
    const token = sessionStorage.getItem("token"); 

    const response = await axios.get(URL, {
        headers: {
            'token': token 
        }
    });

    return response.data;
}

export async function updateusername(newEmail) {
    const URL = config.Base_URL + "/admin/update/username";
    
 
    const oldEmail = sessionStorage.getItem("username"); 

    const body = { 
        email: newEmail,    
        username: oldEmail  
    };

    const response = await axios.put(URL, body, {
        headers: {
            token: sessionStorage.getItem("token")
        }
    });

    return response.data;
}