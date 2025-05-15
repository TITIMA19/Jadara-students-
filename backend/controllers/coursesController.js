const Courses = require('../models/courses');
exports.createCourses = async(req,res)=>{
const newCourses =new Courses();
const coursestitle = req.body.title;
const coursesdescription = req.body.description;
newCourses.title =coursestitle;
newCourses.description=coursesdescription;
try{
    await newCourses.save();
    res.json(newCourses);
} catch (error){
    console.error("Error creating user:", error.message);
     res.status(400).json({ error: error.message });
}
};
// Get all courses
exports.getAllCourses = async(req,res)=>{
try {
    const courses = await Courses.find({});
    console.log("the courses are", courses );
    res.json(courses);
} catch (error){
    console.log("Error fetching courses:", error.message);
    res.status(500).json({ error: "Failed to fetch courses" });
}
};
// Get a specific course by ID
exports.getCoursesById = async (req, res) => {
  const id = req.params.userId;
  
  try {
    const course = await Courses.findById(id);
    if (!course) {
      return res.status(404).json({ error: "course not found" });
    }
    res.json(course);
  } catch (error) {
    console.log("error while reading course of id ", id);
    return res.status(500).json({ error: "Server error" });
  }
};

// Delete a user
exports.deleteCourse = async (req, res) => {
  const id = req.params.courseId;
  try {
    const course = await Courses.findByIdAndDelete(id);
    
    if (!course) {
      return res.status(404).json({ error: "course not found" });
    }
    
    res.json(course);
  } catch (error) {
    console.log("error while deleting course of id ", id);
    return res.status(500).json({ error: error.message });
  }
};