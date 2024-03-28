const childrenSchema = require("./../../Model/childModel ");

exports.getAllchildrens=(request,response,next)=>{
    childrenSchema.find({})
    .then((data)=>{
        response.status(200).json({data});
    })
    .catch((error)=>{
        next(error)
    })
};

exports.getchildrenById = (request, response, next) => {
    const childId = request.params.id;

    childrenSchema.findOne({ _id: childId })
    .then((object)=>{
        if (!object) {
            throw new Error("Child not Exists");
          }
        response.status(200).json({ object});
    })
    .catch((error)=>{
        next(error)
    })

};
  
exports.addNewchild = (request, response, next) => {
    let object = new childrenSchema(request.body);
  object
    .save()
    .then((data) => {
        response.status(200).json({ data });
    })
    .catch((error) => next(error));
};
exports.updatechild = (request, response, next) => {
    const updatedData = request.body;

    if (!updatedData._id) {
        throw new Error("Child ID is required");
    }
 
    childrenSchema.updateOne({ _id: updatedData._id } )
        .then((existingChild) => {
            if (!existingChild) {
                throw new Error("Child not found");
            }
        
            return childrenSchema.updateOne({ _id: updatedData._id }, updatedData);
        })
        .then(() => {
            return childrenSchema.findOne({ _id: updatedData._id });
        })
        .then((updatedChild) => {
            
            response.status(200).json({ data: updatedChild });
        })
        .catch((error) => {
            next(error);
        });
};


exports.deletechild = (request, response, next) => {
    const childId = request.params.id;

    childrenSchema.deleteOne({_id: childId})
        .then(deletedChild => {
            if (!deletedChild) {
                throw new Error("Child not Exists");
            }
            response.status(200).json({ data: "Deleted successfully" });
        })
        .catch(error => {
            next(error);
        });

};
