const jwt=require("jsonwebtoken");
const result=require("../utils/result");
const config=require("../utils/config");
function authuser(req,res,next){
    const allAlloweduser=["/common/auth/login","/student/register-to-course","/common/course/all-active-course"];

    if(allAlloweduser.includes(req.url))  return next();

    else{
        const token=req.headers.token;
        if(!token){
            res.send(result.createResult("Token is missing"))
        }

        else{
            try{
                const payload=jwt.verify(token,config.SECRET);
                 console.log(payload)
                req.headers.email=payload.email;
                req.headers.role=payload.role;
                next();
            }
            catch{
                res.send(result.createResult("Invalid token"));
            }
        }
    }
}

function authorization(req,res,next){
    const role=req.headers.role;
    if(role==="admin"){
        return next();
    }
    else{
        return res.send(result.createResult("need authorized access"));
    }
}

module.exports={authuser,authorization};