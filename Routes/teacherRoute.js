 const express = require("express");
const controller=require("../Controllers/teachers/teachersController");
const {insertValidator,updateValidator} = require("./../MiddleWares/validations/teacherValidator");
const validationResult = require("./../MiddleWares/validations/validatorResult");
const {isAuthorized,isTeacher} = require("../MiddleWares/authenticationMW");

const router = express.Router();

//first route 
router
     .route("/teachers")
     .get(isAuthorized, controller.getAllteachers)
     .post(isAuthorized,insertValidator,validationResult,controller.addNewTeacher)
     

//second route
router
     .route("/teachers/supervisors")
     .get(isAuthorized,controller.getAllsupervisors)

     
//third route 
router
     .route("/teachers/:id")
     .get(isAuthorized,controller.getTeacherById)
     .delete(isAuthorized,controller.deleteTeacher)
     .patch(isTeacher,updateValidator,validationResult,controller.updateTeacher)



module.exports = router; 