
const TeacherShema = require("./../Model/teacherModel");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
    TeacherShema.findOne({
        email: req.body.email,
        password: req.body.password,
  })
    .then((object) => {
     // console.log("********************")
      if (!object) {
        throw new Error("Not Authenticated");
      }
     console.log(object)
      let token = jwt.sign(
        {
          _id: object._id,
          role: object.role,
        },
        "os track",
      );

      res.json({ data: "Authenticated", token });

    })
    .catch((error) => next(error));
};
 