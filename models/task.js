const mongoose=require("mongoose");
const Joi=require('joi');
const TaskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
});

const  Tasks=mongoose.model("Tasks",TaskSchema);

function validateTask(task){
    const schema=Joi.object({
        name:Joi.string().max(30).required(),
        completed:Joi.boolean()
    })

    return schema.validate(task);

}

module.exports.Tasks=Tasks;
module.exports.validate=validateTask;
