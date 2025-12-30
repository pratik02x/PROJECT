const express=require("express");
const result=require("../utils/result")
const pool=require("../db/pool")
const crypto=require("crypto-js")


const router=express.Router();
//add a student to a course
router.post("/register-to-course",(req,res)=>{
    
    const {name, email,course_id,mobile_no}=req.body;

    // step 1 check if user exists
    const usersql="SELECT * FROM users WHERE email=?";
    pool.query(usersql,[email],(error,data)=>{
        if(error){
            return res.send(result.createResult(error));
        }
        else if(data.length==0){
            const password = "sunbeam";
            // crypto 
            const hashedpassword=crypto.SHA256(password).toString();
            
            const role="student";
             const uusersql=`INSERT INTO users(email,password,role) VALUES(?,?,?)`;
             pool.query(uusersql,[email,hashedpassword,role],(error,data)=>{

                if(error){
                    return res.send(result.createResult(error));
                }

                const sql=`INSERT INTO students(name,email, course_id,mobile_no) VALUES(?,?,?,?)`;
                 pool.query(sql,[name,email, course_id,mobile_no],(error,data)=>{
                     if(error){
                        return res.send(result.createResult(error));
                    }
                  res.send(result.createResult(null,data));
                })


                
             })


            
        }
         else{
             const sql=`INSERT INTO students(name,email, course_id,mobile_no) VALUES(?,?,?,?)`;
             pool.query(sql,[name,email, course_id,mobile_no],(error,data)=>{
             if(error){
                 return res.send(result.createResult(error));
             }
            res.send(result.createResult(null,data));
            })
    
        }
        
})

})

   
  


//update password
router.put("/changepassword", (req, res) => {

  const { oldpassword, newpassword, confirmpassword } = req.body;
  const email = req.headers.email;

 
  if (!oldpassword || !newpassword || !confirmpassword) {
    return res.send(result.createResult("All fields are required"));
  }

  if (newpassword !== confirmpassword) {
    return res.send(result.createResult("Passwords do not match"));
  }

 
  const oldHashedPassword = crypto.SHA256(oldpassword).toString();

 
  const checkSql = `SELECT * FROM users WHERE email=? AND password=?`;

  pool.query(checkSql, [email, oldHashedPassword], (error, data) => {

    if (error) {
      return res.send(result.createResult(error));
    }

   
    if (data.length === 0) {
      return res.send(result.createResult("Old password is incorrect"));
    }

    
    const newHashedPassword = crypto.SHA256(newpassword).toString();

    
    const updateSql = `UPDATE users SET password=? WHERE email=?`;

    pool.query(updateSql, [newHashedPassword, email], (err2, updateResult) => {

      if (err2) {
        return res.send(result.createResult(err2));
      }

      if (updateResult.affectedRows === 0) {
        return res.send(result.createResult("Invalid email"));
      }

      return res.send(
        result.createResult(null, "Password updated successfully")
      );
    });
  });
});


// /get all registered courses of a student

router.get("/my-courses", (req, res) => {
    const { email } = req.headers;

    // DISTINCT mule duplicate course entries kadhun taklya jaatat
    const sql = `
      SELECT DISTINCT 
          c.course_id, 
          c.course_name, 
          c.image, 
          c.start_date, 
          c.end_date
      FROM courses c
      INNER JOIN students s ON s.course_id = c.course_id
      WHERE s.email = ?
    `;

    pool.query(sql, [email], (error, data) => {
        if (error) {
            return res.send(result.createResult(error));
        }
        // Jar data nasel tar empty array pathva
        res.send(result.createResult(null, data || []));
    });
});

// // /my-coursewith-videos
router.get("/my-coursewith-videos", (req, res) => {
    const { email } = req.headers;

    const sql = `
        SELECT DISTINCT
            c.course_id,
            c.course_name,
            c.start_date,
            c.end_date,
            v.video_id,
            v.title,
            v.youtube_url
        FROM students s
        INNER JOIN courses c ON s.course_id = c.course_id
        INNER JOIN videos v ON c.course_id = v.course_id
        WHERE s.email = ?
    `;

    pool.query(sql, [email], (error, data) => {
        if (error) return res.send(result.createResult(error));
        res.send(result.createResult(null, data));
    });
});


module.exports=router;

router.get("/course-videos/:id", (req, res) => {
    const courseId = req.params.id; // URL madhun ID ghene

    const sql = `
        SELECT video_id, title AS video_title, youtube_url AS video_url 
        FROM videos 
        WHERE course_id = ?
    `;

    pool.query(sql, [courseId], (error, data) => {
        if (error) return res.send(result.createResult(error));
        // Jar videos sapdle nahit tar empty array pathva
        res.send(result.createResult(null, data || []));
    });
});





module.exports=router;