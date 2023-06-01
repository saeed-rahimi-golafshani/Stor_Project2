const Controller = require("../../controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../../../Models/course");
const path = require("path");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { objectCopy, deleteInvalidPropertyInObject, deleteFileInPath, getTimeOfCourse } = require("../../../../Utils/functions");

class CourseController extends Controller{
    
    async getListOfCourse(req, res, next){
        try {
            const { search } = req.query;
            let course;
            if(search) course = await CourseModel.find({$text: {$search: search}})
            .populate([
                {path: "category", select: {title: 1}},
                {path: "teacher", select: {firstname: 1, lastname: 1, mobile: 1, email: 1}}
            ]).sort({_id: -1});
            else course = await CourseModel.find({})
            .populate([
                {path: "category", select: {title: 1}},
                {path: "teacher", select: {firstname: 1, lastname: 1, mobile: 1, email: 1}}
            ])
            .sort({_id: -1});
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
    async addCoures(req, res, next){
        try {
            const {fileUploadPath, filename} = req.body;
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
            const teacher = req.user._id;
            const {title, short_text, text, tags, category, price, discount, type, status} = req.body;
            if(Number(price) > 0 && type === "free") throw createHttpError.BadRequest("برای دوره رایگان نمیتوان قیمت ثبت کرد")
            if(Number(price) == 0  && type === "cash") throw createHttpError.BadRequest("برای دوره های غیر رایگان قیمت را ثبت نمایید")
            const course = await CourseModel.create(
                {
                    title, 
                    short_text, 
                    text, tags, 
                    category, 
                    price, 
                    discount, 
                    type, 
                    image, 
                    teacher,
                    status,
                });
            if(!course?._id) throw createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: `"دوره آموزشی(${req.body.title}) با موفقیت ثبت شد`
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfCourseById(req, res, next){
        try {
            const {id} = req.params;
            const course = await CourseModel.findById(id);
            if(!course) throw createHttpError.NotFound("دوره ای یافت نشد")
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
    async updateCourse(req, res, next){
        try {
            const { id } = req.params;
            const course = await this.findCourseById(id);
            const data = objectCopy(req.body);
            const blackListFeilds = ["comments", "likes", "dislikes", "bookmarks", "time", "teacher", "students", "chapters", "fileUploadPath", "filename"];
            const { fileUploadPath, filename } = req.body;
            deleteInvalidPropertyInObject(data, blackListFeilds);
            if(req.file){
                data.image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
                deleteFileInPath(course.image);
            }
            const courseUpdateResault = await CourseModel.updateOne({_id: id}, {
                $set: data
            });
            if(courseUpdateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("به روز رسانی دوره انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async findCourseById(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد")
        const resault = await CourseModel.findById(id);
        if(!resault) throw createHttpError.NotFound("دوره مورد نظر یافت نشد")
        return resault
    }
}

module.exports  = {
    // AbstractCourseController: CourseController,
    CourseController: new CourseController()
}