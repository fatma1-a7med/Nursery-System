const { body, param, query } = require("express-validator");

exports.insertValidator = [
  body("_id")
    .isInt()
    .withMessage("Child id must be Integer"),
  body("fullname")
    .isAlpha()
    .withMessage("Child fullname must be string"),
    body("age")
    .isInt()
  
    .withMessage("Child age must be strong"),
    body("level")
    .isIn(['PreKG','KG1','KG2'])
    .withMessage("Child level must be matched"),
    
    body("address.city")
    .isString()
    .withMessage("Address city must be a string"),
    body("address.street")
    .isInt()
    .withMessage("Address street must be an integer"),
     body("address.building")
    .isInt()
    .withMessage("Address building must be an integer")  
];

  exports.updateValidator = [
    body("_id")
      .isInt()
      .withMessage("Child id must be Integer"),
    body("fullname")
      .isAlpha()
      .optional()
      .withMessage("Child fullname must be string"),
    body("age")
      .isInt()
      .optional()
      .withMessage("Child age must be strong"),
      body("level")
      .isIn(['PreKG','KG1','KG2'])
      .optional()
      .withMessage("Child level must be matched"),
      body("address.city")
    .isString()
    .optional()
    .withMessage("Address city must be a string"),
    body("address.street")
    .isInt()
    .optional()
    .withMessage("Address street must be an integer"),
     body("address.building")
    .isInt()
    .optional()
    .withMessage("Address building must be an integer")   
  ];

