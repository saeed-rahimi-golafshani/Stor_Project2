const createHttpError = require("http-errors");
const { UserModel } = require("../../../../Models/user");
const Controller = require("../../controller");
const { StatusCodes: httpStatus} = require("http-status-codes");
const { objectCopy, deleteInvalidPropertyInObject } = require("../../../../Utils/functions")

class UserController extends Controller{
    async getAllUser(req, res, next){
        try {
            const { search } = req.query;
            const dataBaseQuery = {};
            if(search) dataBaseQuery["$text"] = {$search: search};
            const users = await UserModel.find(dataBaseQuery)
            if(!users) throw new createHttpError.NotFound("کاربری یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateUserProfile(req, res, next){
        try {
            const userID = req.user._id;
            const data = objectCopy(req.body);
            const blackListFeilds = ["mobile", "otp", "bills", "discount", "roles", "Course"];
            deleteInvalidPropertyInObject(data, blackListFeilds);
            const updateResault = await UserModel.updateOne({_id: userID}, {$set: data});
            if(!updateResault.modifiedCount) throw new createHttpError.InternalServerError("به روز رسانی انجام نشد");
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
    async UserProfile(req, res, next){
        try {
            const user = req.user;
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    user
                }
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    UserController: new UserController()
}