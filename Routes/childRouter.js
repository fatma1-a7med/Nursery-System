const express = require("express");
const controller=require("../Controllers/Child/childController");
const {insertValidator,updateValidator} = require("./../MiddleWares/validations/childValidator");
const validationResult = require("./../MiddleWares/validations/validatorResult");
const router = express.Router();

//first route 
router
     .route("/child")
     .get(controller.getAllchildrens)
     .post(insertValidator,validationResult,controller.addNewchild)
     .patch(updateValidator,validationResult,controller.updatechild)

     

//second route
router
     .route("/child/:id")
     .get(controller.getchildrenById)
     .delete(controller.deletechild)



module.exports = router;