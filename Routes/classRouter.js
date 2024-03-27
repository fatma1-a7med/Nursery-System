const express = require("express");
const controller=require("../Controllers/class/classController");
const {insertValidator,updateValidator} = require("../MiddleWares/validations/classValidator");
const validationResult = require("../MiddleWares/validations/validatorResult");

const router = express.Router();

//first route 
router
     .route("/class")
     .get(controller.getAllclasses)
     .post(insertValidator,validationResult,controller.addNewclass)
     .patch(updateValidator,validationResult,controller.updateClass)

//second route
router
     .route("/class/child/:id")
     .get(controller.getChildInfo)

//third route
router
     .route("/class/teacher/:id")
     .get(controller.getSupervisorInfo)

//fourth route 
router
     .route("/class/:id")
     .get(controller.getclassById)
     .delete(controller.deleteClass)

module.exports = router;