const express=require("express");
const cryptojs=require("crypto-js")
const jwt=require("jsonwebtoken")

const pool=require("../db/pool");
const result=require("../utils/result")
const config=require("../utils/config");
const { error } = require("node:console");


const router=express.Router();

router.post("/auth/login",(req,res)=>{
    const {email,password}=req.body;
  
    // const hashedpassword=cryptojs.SHA256(password).toString;
    const sql="SELECT * FROM users WHERE email=? AND password=?";
    pool.query(sql,[email,password],(error,data)=>{

        if(error){
             res.send(result.createResult(error));
        }
        else if(data.length==0){
             res.send(result.createResult("Invalid email or password"));
        }
        else{
                const user=data[0];
                const payload={
                    email:user.email,
                    password:user.password
                }

                const token=jwt.sign(payload,config.SECRET);

                const userdata={
                    role:user.role,
                    token
                }

                res.send(result.createResult(error,userdata))
                
                
        }
            
        
       
    })
})

router.get("/course/all-active-course",(req,res)=>{
    const sql="SELECT * FROM courses WHERE CURRENT_DATE <= end_date";

    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })

})



module.exports=router;