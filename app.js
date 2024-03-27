const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const teacherRoute=require("./Routes/teacherRoute");
const childRoute=require("./Routes/childRouter");
const classRoute=require("./Routes/classRouter");
const loginRoute = require("./Routes/authenticationRoute");
const authenticationMW = require("./MiddleWares/authenticationMW");
const dot_env = require("dotenv").config();

const server=express();

//console.log(server);
const port=process.env.PORT || 8080;

//open connection then open server
mongoose.connect("mongodb://127.0.0.1:27017/NurserySystem")
.then(()=>{
    console.log("DB Connected....");
    server.listen(port,()=>{
        console.log(`I am listening on port number: ${port}`);
    }) 
})
.catch((error)=>{
    console.log("DB Problem ..." + error);  
})



//First MiddleWare use morgan
server.use(morgan('tiny'));

//use cors
const corsOptions = {
    origin: 'http:localhost:8080',
    //methods: ['GET', 'POST']
  };
server.use(cors(corsOptions));

server.use(express.json());

server.use(loginRoute);

server.use(authenticationMW.isAuthorized,authenticationMW.isTeacher);

//routes
server.use(teacherRoute,childRoute,classRoute);




/* 
server.get('/students',(request,response,next)=>{
    response.status(200).json({data:"Ok"});
});

server.post('/students',(request,response,next)=>{
    response.status(200).json({data:"Ok from post"});
}); */








//second MiddleWare Not Found
server.use((request,response)=>{
    response.status(404).json({data:"Error Not Found"});
});

// Error MiddleWare 
server.use((error,request,response,next)=>{
    response.status(500).json({data:`Error MiddleWare ${error}`})
});

