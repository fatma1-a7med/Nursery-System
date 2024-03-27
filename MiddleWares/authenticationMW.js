const jwt = require("jsonwebtoken");

module.exports.isAuthorized = (req, res, next) => {
  try {
    console.log("------------------------");
    let token = req.get("authorization").split(" ")[1];
    console.log(token);
    let decoded_token = jwt.verify(token, "os track");
    console.log(decoded_token);
    req.token = decoded_token;
    console.log(req.token);
    next();
  } 
  catch (error) {
    error.message = "not Athenticated";
    next(error);
  }
};


module.exports.isAdmin = (req, res, next) => {
  if (req.token.role == "supervisor") {
    next();
  } else {
    const error = new Error("not Authorized");
    error.statusCode = 401;
    throw error;
  }
};

module.exports.isTeacher = (req, res, next) => {
  if (req.token.role == "teacher") {
    next();
  } else {
    const error = new Error("not Authorized");
    error.statusCode = 401;
    throw error;
  }
};