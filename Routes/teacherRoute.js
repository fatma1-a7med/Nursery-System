 const express = require("express");
const controller=require("../Controllers/teachers/teachersController");
const {insertValidator,updateValidator} = require("./../MiddleWares/validations/teacherValidator");
const validationResult = require("./../MiddleWares/validations/validatorResult");
const {isAuthorized,isTeacher} = require("../MiddleWares/authenticationMW");

const router = express.Router();

//first route 
router
     .route("/teachers")
     .get( controller.getAllteachers)
     .post(insertValidator,validationResult,controller.addNewTeacher)
     .patch(updateValidator,validationResult,controller.updateTeacher)

     

//second route
router
     .route("/teachers/supervisors")
     .get(controller.getAllsupervisors)

     
//third route 
router
     .route("/teachers/:id")
     .get(controller.getTeacherById)
     .delete(controller.deleteTeacher)
     .patch(isTeacher,controller.changePassword)

   



module.exports = router; 