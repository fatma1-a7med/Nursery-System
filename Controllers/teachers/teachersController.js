const teacherSchema = require("./../../Model/teacherModel");

exports.getAllteachers=(request,response,next)=>{
    teacherSchema.find({})
    .then((data)=>{
        response.status(200).json({data});
    })
    .catch((error)=>{
        next(error)
    })
};

exports.getTeacherById = (request, response, next) => {
    const teacherId = request.params.id;

    teacherSchema.findOne({ _id: teacherId })
    .then((object)=>{
        if (!object) {
            throw new Error("Teacher not Exists");
          }
        response.status(200).json({ object});
    })
    .catch((error)=>{
        next(error)
    })
};

exports.addNewTeacher = (request, response, next) => {
    let object = new teacherSchema(request.body);
  object
    .save()
    .then((data) => {
        response.status(200).json({ data });
    })
    .catch((error) => next(error));
   
};

exports.updateTeacher = (request, response, next) => {
    const updatedData = request.body;

    if (!updatedData._id) {
        throw new Error("Teacher ID is required");
    }
 
    teacherSchema.updateOne({ _id: updatedData._id } )
        .then((existingTeacher) => {
            if (!existingTeacher) {
                throw new Error("Teacher not found");
            }
        
            return teacherSchema.updateOne({ _id: updatedData._id }, updatedData);
        })
        .then(() => {
            return teacherSchema.findOne({ _id: updatedData._id });
        })
        .then((updatedTeacher) => {
            
            response.status(200).json({ data: updatedTeacher });
        })
        .catch((error) => {
            next(error);
        });
};

exports.deleteTeacher = (request, response, next) => {
    const teacherId = request.params.id;

    teacherSchema.deleteOne({_id: teacherId})
        .then(deletedTeacher => {
            if (!deletedTeacher) {
                throw new Error("Teacher not Exists");
            }
            response.status(200).json({ data: "Deleted successfully" });
        })
        .catch(error => {
            next(error);
        });

};

exports.getAllsupervisors=(request,response,next)=>{

    teacherSchema.find({ role: "supervisor" })
    .then(supervisors => {
        response.status(200).json({ data: supervisors });
    })
    .catch(error => {
        next(error);
    });
};



/* exports.updateAllTeachers = (request, response, next) => {
    
    const updatedData = request.body.updatedData;

    // Check if teacherIds or updatedData are missing
    if (!updatedData) {
        return response.status(400).json({ error: "updatedData are required." });
    }

    teacherSchema.updateMany(
        {},
        updatedData
    )
    .then(() => {
        return teacherSchema.find({});
    })
    .then((updatedTeachers) => {
        response.status(200).json({ data: updatedTeachers });
    })
    .catch((error) => {
        next(error);
    });
};
 */

