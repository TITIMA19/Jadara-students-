const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const coursesSchema =new Schema({
    title:{
        type:String,
        
    },
    description:{
        type:String,
    }
});
const Courses =mongoose.model("Courses",coursesSchema);
module.exports=Courses;