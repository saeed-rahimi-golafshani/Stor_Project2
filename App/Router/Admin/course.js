const router = require("express").Router();
const { CourseController } = require("../../Http/Controllers/Admin/Course/course.controller");
const { srtingToArray } = require("../../Http/Middlewares/stringToArray");
const { uploadFile } = require("../../Utils/multer");

router.post("/add", uploadFile.single("image"), srtingToArray("tags"), CourseController.addCoures)
router.get("/list", CourseController.getListOfCourse);
router.get("/list/:id", CourseController.getListOfCourseById);
router.patch("/update/:id", uploadFile.single("image"), CourseController.updateCourse)

module.exports = {
    AdminApiCouresRouter: router
}