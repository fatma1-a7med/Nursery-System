 const express = require("express");
const controller=require("../Controllers/teachers/teachersController");
const {insertValidator,updateValidator} = require("./../MiddleWares/validations/teacherValidator");
const validationResult = require("./../MiddleWares/validations/validatorResult");
const {isAuthorized,isTeacher} = require("../MiddleWares/authenticationMW");
 const multer = require("multer");

const path = require("path");
 
const router = express.Router();

//upload image to mongodb
const storage = multer.diskStorage({
     destination: (req, file, cb) => {
       cb(null, path.join(__dirname, "./../images"));
     },
     filename: (req, file, cb) => {
       let finalName =
         new Date().toLocaleDateString().replace(/\//g, "_") +
         "_" +
         file.originalname;
       cb(null, finalName);
     },
   });

   const fileFilter = (request, file, cb) => {
     if (
       file.mimetype == "image/png" || 
       file.mimetype == "image/jpg" ||
       file.mimetype == "image/jpeg"
     ) {
       cb(null, true);
     } else {
       cb(new Error("file should be Image only"));
     }
   };
   
const upload = multer({ storage, fileFilter });

//first route 
router
     .route("/teachers")
     .get(isAuthorized, controller.getAllteachers)
    .post(isAuthorized, upload.single('image'),insertValidator,validationResult,controller.addNewTeacher)
     .patch(isTeacher, upload.single('image'),updateValidator,validationResult,controller.updateTeacher)

     

//second route
router
     .route("/teachers/supervisors")
     .get(isAuthorized,controller.getAllsupervisors)

     
//third route 
router
     .route("/teachers/:id")
     .get(isAuthorized,controller.getTeacherById)
     .delete(isAuthorized,controller.deleteTeacher)
     .patch(isTeacher,controller.changePassword)

   



module.exports = router; 