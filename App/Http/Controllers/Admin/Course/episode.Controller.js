const { createEpisodeSchema } = require("../../../Validations/Admin/courseschema");
const Controller = require("../../controller");
const path = require("path");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { getTime, objectCopy, deleteInvalidPropertyInObject } = require("../../../../Utils/functions");
const { CourseModel } = require("../../../../Models/course");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { ObjectIdValidator } = require("../../../Validations/Admin/publicValid.Schema");

class EpisodeController extends Controller{
    async addNewEpisode(req, res, next){
        try {
            const { title, text, type, chapterId, courseId, filename, fileUploadPath } = await createEpisodeSchema.validateAsync(req.body)
            const videoAddress = path.join(fileUploadPath,filename).replace(/\\/g, "/");
            const videoUrl = `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
            const seconds = await getVideoDurationInSeconds(videoUrl);
            const time = getTime(seconds);
            const episode = {
                title,
                text, 
                type,
                time,
                videoAddress
            };
            const createEpisodeResault = await CourseModel.updateOne({_id: courseId, "chapters._id": chapterId}, {
                $push: {
                    "chapters.$.episodes": episode
                }
            });
            if(createEpisodeResault.modifiedCount == 0) throw createHttpError.InternalServerError("در ثبت اپیزود خطایی رخ داده است، لطفا مجددا تلاش نمایید")
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "اپیزود با موفقست ثبت شد"
                }
            });            
        } catch (error) {
            next(error)
        }
    }
    async removeEpisodeById(req, res, next){
        try {
            const { id: episodeId } = await ObjectIdValidator.validateAsync({id: req.params.episodeId});
            const removeEpisodeResault = await CourseModel.updateOne(
                {
                    "chapters.episodes._id": episodeId}, 
                {
                    $pull: {
                        "chapters.$.episodes": {
                            _id: episodeId
                        }
                }
            });
            if(removeEpisodeResault.modifiedCount == 0) throw createHttpError.InternalServerError("حذف اپیزود با خطا مواجه شد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "اپیزود با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateEpisodeById(req, res, next){
        try {
            const { episodeId } = req.params;
            const episode = await this.getOneEpisode(episodeId);
            const {fileUploadPath, filename} = req.body;
            let blackListField = ["_id"];
            if(fileUploadPath && filename){
                const fileAddress = path.join(fileUploadPath, filename);
                req.body.videoAddress = fileAddress.replace(/\\/g, "/");
                const videoUrl = `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`;
                const seconds = await getVideoDurationInSeconds(videoUrl);
                req.body.time = getTime(seconds);
                blackListField.push("fileUploadPath");
                blackListField.push("filename");
            }else {
                blackListField.push("time");
                blackListField.push("videoAddress")
            }
            const data = req.body;
            deleteInvalidPropertyInObject(data, blackListField);
            const newEpisode = {
                ...episode,
                ...data
            }
            console.log(newEpisode);
            const editEpisodeResault = await CourseModel.updateOne({
                "chapters.episodes._id": episodeId
            }, {
                $set: {
                    "chapters.$.episodes": newEpisode
                }
            });
            if(!editEpisodeResault.modifiedCount) throw new createHttpError.InternalServerError("ویرایش اپیزود انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "اپیزود با موفقیت ویرایش شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getOneEpisode(episodeId){
        const course = await CourseModel.findOne({"chapters.episodes._id": episodeId}, {
            "chapters.$.episodes" : 1
        });
        if(!course) throw new createHttpError.NotFound("اپیزود یافت نشد");
        const episode = await course?.chapters?.[0]?.episodes?.[0];
        if(!episode) throw new createHttpError.NotFound("اپیزود یافت نشد");
        return objectCopy(episode)
    }
    
}

module.exports ={ 
    EpisodeController: new EpisodeController()
}