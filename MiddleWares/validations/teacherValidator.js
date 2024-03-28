const { body} = require("express-validator");

exports.insertValidator = [
/*   body("_id")
    .isMongoId()
    .withMessage("Teacher id must be objectId"), */
  body("fullname")
    .isAlpha()
    .withMessage("Teacher fullname must be string"),
  body("password")
    .isStrongPassword()
  
    .withMessage("Teacher password must be strong"),
  body("email")
    .isEmail()
 
    .withMessage("Teacher email must be valid"),
  body("image")
    .isString()
    .withMessage("Teacher image path must be valid"),

  body("role")
    .isString()
    .optional()
    .withMessage("Teacher role must be teacher or supervisor") 
];
exports.updateValidator = [
/*     body("_id")
      .isMongoId()
      .withMessage("Teacher id must be objectId"), */
    body("fullname")
      .isAlpha()
      .optional()
      .withMessage("Teacher fullname must be string"),
    body("password")
      .isStrongPassword()
      .optional()
      .withMessage("Teacher password must be strong"),
    body("email")
      .isEmail()
      .optional()
      .withMessage("Teacher email must be valid"),
    body("image")
      .isString()
      .optional()
      .withMessage("Teacher image path must be valid")  ,
    body("role")
      .isString()
      .optional()
      .withMessage("Teacher role must be teacher or supervisor")    
  ];