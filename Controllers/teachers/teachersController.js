const teacherSchema = require("./../../Model/teacherModel");
const bcrypt = require('bcryptjs');



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



exports.addNewTeacher=(request,response,next)=>{
    let object = new teacherSchema({
     
        fullname:request.body.fullname,
        password:request.body.password,
        email:request.body.email,
        image:request.file.filename
    })
    object.save()
        .then(data => {
            console.log(request.body);
            //console.log(request.file);
            response.status(200).json({data});
        })
        .catch(error=>{
            console.log(request.body);
            
            next(error);
        })
};


exports.updateTeacher = (request, response, next) => {
    const updatedData = request.body;

    if (!updatedData._id) {
        throw new Error("Teacher ID is required");
    }
 
    if (request.file && request.file.filename) {
        updatedData.image = request.file.filename;
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

exports.changePassword = (request, response, next) => {
    const { password } = request.body;
    const userId = request.params.id;

    teacherSchema.findById(userId)
        .then(user => {
            if (!user) {
                throw new Error('User not found');
            }
            bcrypt.hash(password, 10, (error, hashedPassword) => {
                if (error) {
                    return next(error);
                }

                user.password = hashedPassword;

                const updateData = { password: hashedPassword };

                teacherSchema.updateOne({ _id: userId }, updateData)
                    .then(() => {
                        response.status(200).json({ message: 'Password changed successfully' });
                    })
                    .catch(error => {
                        next(error);
                    });
            });
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

