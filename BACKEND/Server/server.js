const express=require("express");


const app=express();


const commenApi=require("./routes/common_Api");
const adminRouter=require("./routes/Admin");
const studentRouter=require("./routes/student");
app.use(express.json())
app.use("/common",commenApi);
app.use("/admin",adminRouter);
app.use("/student",studentRouter);

app.listen(4000,"localhost",()=>{
    console.log("server start at port 4000");
})

