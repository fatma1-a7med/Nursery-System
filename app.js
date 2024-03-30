const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dot_env = require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 

const teacherRoute=require("./Routes/teacherRoute");
const childRoute=require("./Routes/childRouter");
const classRoute=require("./Routes/classRouter");
const loginRoute = require("./Routes/authenticationRoute");
const {isAuthorized, isTeacher} = require("./MiddleWares/authenticationMW");



const server=express();


const port=process.env.PORT || 8080;

//open connection then open server
mongoose.connect(process.env.DB_URL)
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

// Swagger UI setup
server.use('/Nursery', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(loginRoute);

server.use(isAuthorized,isTeacher);


//routes
server.use( teacherRoute, childRoute, classRoute);





//second MiddleWare Not Found
server.use((request,response)=>{
    response.status(404).json({data:"Error Not Found"});
});

// Error MiddleWare 
server.use((error,request,response,next)=>{
   
        response.status(500).json({ data: `Error MiddleWare: ${error.message}` });
    
});

