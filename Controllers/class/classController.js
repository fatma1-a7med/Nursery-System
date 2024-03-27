const classSchema = require("./../../Model/classModel");

//get All classes
exports.getAllclasses=(request,response,next)=>{
    classSchema.find({})
    .then((data)=>{
        response.status(200).json({data});
    })
    .catch((error)=>{
        next(error)
    })
};

//get class ById
exports.getclassById = (request, response, next) => {
    const classId = request.params.id;

    classSchema.findOne({ _id: classId })
    .then((object)=>{
        if (!object) {
            throw new Error("Class not Exists");
          }
        response.status(200).json({ object});
    })
    .catch((error)=>{
        next(error)
    })
};

//add New class
exports.addNewclass = (request, response, next) => {
    let object = new classSchema(request.body);
  object
    .save()
    .then((data) => {
        response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

//update Class
exports.updateClass = (request, response, next) => {
    const classId = request.params.id;
    const updatedData = request.body;

    if (!classId) {
        throw new Error("Class ID is required");
    }

    classSchema.updateOne(
        {_id: classId},
        updatedData
        )
        .then(() => {
            return childrenSchema.findOne({_id: classId});
        })
        .then((updatedClass) => {
            if (!updatedClass) {
                throw new Error("Class not Exists");
            }
            response.status(200).json({ data: updatedClass });
        })
        .catch((error) => {
            next(error);
        });
};

//delete Class
exports.deleteClass = (request, response, next) => {
    const classId = request.params.id;

    classSchema.deleteOne({_id: classId})
        .then(deletedClass => {
            if (!deletedClass) {
                throw new Error("Class not Exists");
            }
            response.status(200).json({ data: "Deleted successfully" });
        })
        .catch(error => {
            next(error);
    });
};

//get Child Info
exports.getChildInfo=(request,response,next)=>{
    const classId = request.params.id;

    classSchema.findOne({_id: classId})
        .populate({path:"children"})
        .then(classData => {
            if (!classData) {
                throw new Error("Class not found");
            }
            response.status(200).json({ children: classData.children });
        })
        .catch(error => {
            next(error);
        });
};

//get Supervisor Info
exports.getSupervisorInfo=(request,response,next)=>{
    const classId = request.params.id;

    classSchema.findById(classId)
    .populate('supervisor')
    .then(classData => {
        if (!classData) {
            throw new Error("Class not found");
        }
        const supervisor = classData.supervisor;
        response.status(200).json({ supervisor });
    })
    .catch(error => {
        next(error);
    });
};

