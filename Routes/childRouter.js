const express = require("express");
const controller=require("../Controllers/Child/childController");
const {insertValidator,updateValidator} = require("./../MiddleWares/validations/childValidator");
const validationResult = require("./../MiddleWares/validations/validatorResult");
const {isAuthorized} = require("../MiddleWares/authenticationMW");


const router = express.Router();

//first route 
router
     .route("/child")
     .get(isAuthorized,controller.getAllchildrens)
     .post(isAuthorized,insertValidator,validationResult,controller.addNewchild)
     .patch(isAuthorized,updateValidator,validationResult,controller.updatechild)

     

//second route
router
     .route("/child/:id")
     .get(isAuthorized,controller.getchildrenById)
     .delete(isAuthorized,controller.deletechild)



module.exports = router;