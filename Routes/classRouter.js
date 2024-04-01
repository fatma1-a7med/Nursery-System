const express = require("express");
const controller=require("../Controllers/class/classController");
const {insertValidator,updateValidator} = require("../MiddleWares/validations/classValidator");
const validationResult = require("../MiddleWares/validations/validatorResult");
const {isAuthorized} = require("../MiddleWares/authenticationMW");


const router = express.Router();

//first route 
router
     .route("/class")
     .get(isAuthorized,controller.getAllclasses)
     .post(isAuthorized,insertValidator,validationResult,controller.addNewclass)
     .patch(isAuthorized,updateValidator,validationResult,controller.updateClass)

//second route
router
     .route("/class/child/:id")
     .get(isAuthorized,controller.getChildInfo)

//third route
router
     .route("/class/teacher/:id")
     .get(isAuthorized,controller.getSupervisorInfo)

//fourth route 
router
     .route("/class/:id")
     .get(isAuthorized,controller.getclassById)
     .delete(isAuthorized,controller.deleteClass)

module.exports = router;