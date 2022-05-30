const express=require("express");
const app=express();


require('./startup/routes')(app);
require('./startup/db')();


// app.use(tasks);



app.listen(8080,()=>{
    console.log("server is running on port 8080");
})