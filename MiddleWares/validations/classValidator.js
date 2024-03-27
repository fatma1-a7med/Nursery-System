const { body, param, query } = require("express-validator");

exports.insertValidator = [
  body("_id")
    .isInt()
    .withMessage("Class id must be Integer"),
  body("name")
    .isAlpha()
    .withMessage("Class name must be string"),
    body("supervisor")
    .isMongoId()
    .withMessage("Class supervisor must be teacher id number"),
    body("children")
    .isArray()
    .withMessage("Class children must be matched") 
];

  exports.updateValidator = [
    body("_id")
    .isInt()
    .withMessage("Class id must be Integer"),
  body("name")
    .isAlpha()
    .optional()
    .withMessage("Class name must be string"),
    body("supervisor")
    .isMongoId()
    .optional()
    .withMessage("Class supervisor must be teacher id number"),
    body("children")
    .isArray()
    .optional()
    .withMessage("Class children must be matched") 
];