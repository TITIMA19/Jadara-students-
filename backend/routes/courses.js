const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

// User routes
router.post("/", coursesController.createCourses);
router.get("/", coursesController.getAllCourses);
router.get("/:courseId", coursesController.getCoursesById);
router.put("/:courseId", coursesController.updateCourse);
router.delete("/:courseId", coursesController.deleteCourse);

module.exports = router;