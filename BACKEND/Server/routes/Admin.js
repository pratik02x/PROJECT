const express=require("express");
const router=express.Router();
const multer = require('multer');
const path = require('path');

const{authorization}=require("../utils/auth")

const pool=require("../db/pool");
const result=require("../utils/result");
const { param, route } = require("./common_Api");
const { error } = require("node:console");


router.get("/course/all-courses",(req,res)=>{
    
    const sql=`SELECT * FROM courses`;
    pool.query(sql,(error,data)=>{
        if(error){
            return res.send(result.createResult(error));
        }

        else if(data.length==0){
            res.send(result.createResult("NO courses available"));
        }
        res.send(result.createResult("NUll",data))
    })
})

//add course








const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


router.post("/add", authorization, upload.single('course_image'), (req, res) => {
   
    if (!req.body) {
        return res.status(400).send({ status: 'error', message: "Data not received " });
    }

   
    const { course_name, description, fees, start_date, end_date, video_expire_days } = req.body;
    
    
    if (!course_name) {
        return res.status(400).send({ status: 'error', message: "course_name missing!" });
    }

    const image_name = req.file ? req.file.filename : null;

    const sql = `INSERT INTO courses (course_name, description, fees, start_date, end_date, video_expire_days, course_image) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    pool.query(sql, [course_name, description, fees, start_date, end_date, video_expire_days, image_name], (error, data) => {
        if (error) return res.send({ status: 'error', error: error.message });
        res.send({ status: 'success', data: data });
    });
});
//update a course

router.put("/course/update/:course_id",authorization,(req,res)=>{
    const{course_id}=req.params;
    const{course_name,description,fees,start_date,end_date,video_expire_days}=req.body;
    const sql=`UPDATE courses SET course_name=?,description=?,fees=?,start_date=?,end_date=?,video_expire_days=? WHERE course_id=? `;
    pool.query(sql,[course_name,description,fees,start_date,end_date,video_expire_days,course_id],(error,data)=>{
        if(error){
            res.send(result.createResult(error));
        }
      else if(data.affectedRows==0){
            res.send(result.createResult("data not found"));
        }
         else{
                res.send(result.createResult(null,data))
         }
        
    })
})

//delete a course by course id
router.delete("/course/delete/:courseId", authorization, (req, res) => {
    const { courseId } = req.params;

    if (!courseId) {
        return res.send({ status: 'error', message: "Course ID missing aahe!" });
    }


    const sqlVideos = `DELETE FROM videos WHERE course_id = ?`;

    pool.query(sqlVideos, [courseId], (error, videoResult) => {
        if (error) {
            console.error("Video Delete Error:", error.message);
            return res.send({ status: 'error', message: "Videos delete karta aale nahit", error: error.message });
        }

       
        const sqlStudents = `DELETE FROM students WHERE course_id = ?`;

        pool.query(sqlStudents, [courseId], (studentErr, studentResult) => {
            if (studentErr) {
                console.error("Student Delete Error:", studentErr.message);
                return res.send({ status: 'error', message: "Students delete karta aale nahit", error: studentErr.message });
            }

           
            const sqlCourse = `DELETE FROM courses WHERE course_id = ?`;

            pool.query(sqlCourse, [courseId], (err, courseResult) => {
                if (err) {
                    console.error("Course Delete Error:", err.message);
                    return res.send({ status: 'error', message: "Course delete karta aale nahit", error: err.message });
                }

                if (courseResult.affectedRows === 0) {
                    return res.send({ status: 'error', message: "Course sapadla nahi" });
                }

              
                res.send({ 
                    status: 'success', 
                    message: "Course deleted successfully" 
                });
            });
        });
    });
});

//fetch all videos
router.get("/video/all-videos/:course_id",authorization,(req,res)=>{
        const{course_id}=req.params;
        const sql=`SELECT * FROM videos WHERE course_id=?`;
        pool.query(sql,[course_id],(error,data)=>{
            if(error){
                return res.send(result.createResult(error));
            }
            
            res.send(result.createResult(null,data));
        })
}) 

//add a new video for course
router.post("/video/add",authorization,(req,res)=>{
    const {course_id, title, description,youtube_url,added_at}=req.body;
    const sql=`INSERT INTO videos(course_id, title, description,youtube_url,added_at) VALUES(?,?,?,?,?)`;
    pool.query(sql,[course_id, title, description,youtube_url,added_at],(error,data)=>{
        res.send(result.createResult(error,data));
    })

 }
)

//update video details by video id
router.put("/video/update/:video_id",authorization,(req,res)=>{
    const {video_id}=req.params;
    const {course_id, title,description,youtube_url,added_at}=req.body;
    const sql=`UPDATE videos SET course_id=?, title=?,description=?,youtube_url=?,added_at=?  WHERE video_id=?`;
    pool.query(sql,[course_id, title,description,youtube_url,added_at,video_id],(error,data)=>{
        if(error){
            return res.send(result.createResult(error));
        }
        else if(data.affectedRows==0){
            return res.send(result.createResult("video not found"));
        }
        res.send(result.createResult(null,data));
    })
 }
)

//delete a video by video id
router.delete("/video/delete/:video_id",authorization,(req,res)=>{
    const{video_id}=req.params;
    const sql=`DELETE FROM videos WHERE video_id=?`;
    pool.query(sql,[video_id],(error,data)=>{
        if(error){
            return res.send(result.createResult(error));
        }
        else if (data.affectedRows==0){
             return res.send(result.createResult("Invalid video Id"));
        }
        res.send(result.createResult(null,data));
    })
})

//get all students enrolled to course by course id

router.get("/enrolled/students",authorization,(req,res)=>{
    const{course_id}=req.query;
    const sql=`SELECT * FROM students WHERE course_id=?`;
    pool.query(sql,[course_id],(error,data)=>{
        res.send(result.createResult(null,data));
    })
})
module.exports=router;

router.get("/all-videos", authorization, (req, res) => {
    const sql = `SELECT v.video_id, c.course_name, v.title, v.description, v.youtube_url, v.added_at 
                 FROM videos v 
                 JOIN courses c ON v.course_id = c.course_id`;
    
    pool.query(sql, (error, data) => {
        if (error) return res.send({ status: 'error', error: error.message });
        res.send({ status: 'success', data: data });
    });
});


router.get("/students/all", authorization, (req, res) => {
    
    const sql = `
        SELECT 
            s.reg_no, 
            s.name, 
            s.email, 
            s.mobile_no, 
            c.course_name AS course 
        FROM students s
        LEFT JOIN courses c ON s.course_id = c.course_id`;

    pool.query(sql, (err, results) => {
        if (err) {
            return res.send({ status: 'error', message: err.message });
        }
        res.send({ status: 'success', data: results });
    });
});

router.put("/update/username", authorization, (req, res) => {
    
    const { email, username } = req.body; 

    if (!email || !username) {
        return res.send({ status: 'error', message: "Data is missing" });
    }

   
    const sql = "UPDATE users SET email = ? WHERE email = ?";

    pool.query(sql, [email, username], (error, data) => {
        if (error) {
            return res.send({ status: 'error', message: "Update fail zale", error: error.message });
        }
        
        if (data.affectedRows === 0) {
            return res.send({ status: 'error', message: "Invalid username" });
        }

        res.send({ status: 'success', data: "Username updated" });
    });
});


