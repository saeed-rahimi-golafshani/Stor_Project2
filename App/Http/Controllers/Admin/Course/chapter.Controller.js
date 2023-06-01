const createHttpError = require("http-errors");
const { CourseModel } = require("../../../../Models/course");
const Controller = require("../../controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { CourseController } = require("./course.controller");
const {deleteInvalidPropertyInObject} = require("../../../../Utils/functions")
// const { AbstractCourseController } = require("./course.controller");

class ChapterController extends Controller{

    async addChapter(req, res, next){
        try {
            const { id, title, text } = req.body;
            await CourseController.findCourseById(id);
            const saveChapterResault = await CourseModel.updateOne({_id: id}, {$push: {
                chapters: {title, text, episodes: []}
            }}); 
            if(saveChapterResault.modifiedCount == 0) throw createHttpError.InternalServerError("فصل افزوده نشد")
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "فصل با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async chapterOfCourse(req, res, next){
        try {
            const { courseID } = req.params;
            const course = await this.getChapterOfCourse(courseID);
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    course
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeChapterById(req, res, next){
        const { chapterId } = req.params;
        await this.getOneCahepter(chapterId);
        const removeChapterResault = await CourseModel.updateOne({"chapters._id": chapterId}, {
            $pull: {
                chapters: {
                    _id: chapterId
                }
            }
        });
        if(removeChapterResault.modifiedCount == 0) throw createHttpError.InternalServerError("حذف فصل با موفقیت انجام نشد");
        return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            data: {
                message: "فصل با موفقیت حذف گردید"
            }
        })
    }
    async updateChapterById(req, res, next){
        try {
            const { chapterId } = req.params;
            await this.getOneCahepter(chapterId);
            const data = req.body;
            deleteInvalidPropertyInObject(data, ["_id"]);
            const updateResault = await CourseModel.updateOne(
                {"chapters._id": chapterId}, 
                {$set: {"chapters.$": data}}
                );
            if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("به روز رسانی انجام نشد")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getChapterOfCourse(id){
        const chapters = await CourseModel.findOne({_id: id}, {chapters: 1, title: 1});
        if(!chapters) throw createHttpError.NotFound("فصلی یافت نشد");
        return chapters
    }
    async getOneCahepter(id){
        const chapter = await CourseModel.findOne({"chapters._id": id}, {"chapters.$": 1})
        if(!chapter) throw createHttpError.NotFound("فصلی با این شناسه یافت نشد");
        return chapter
    }
}

module.exports = {
    ChapterController: new ChapterController()
}