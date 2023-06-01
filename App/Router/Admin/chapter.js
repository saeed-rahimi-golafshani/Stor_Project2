const router = require("express").Router();
const { ChapterController } = require("../../Http/Controllers/Admin/Course/chapter.Controller");

router.put("/add", ChapterController.addChapter);
router.get("/list/:courseID", ChapterController.chapterOfCourse);
router.patch("/remove/:chapterId", ChapterController.removeChapterById);
router.patch("/update/:chapterId", ChapterController.updateChapterById);

module.exports = {
    AdminApiChapterRoutes: router
}