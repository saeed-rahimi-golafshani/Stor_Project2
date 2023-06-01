const Controller = require("../../controller");
const { PermissionModel} = require("../../../../Models/permission");
const createHttpError = require("http-errors");
const {StatusCodes: httpStatus} = require("http-status-codes");
const { addPermissionScheam } = require("../../../Validations/Admin/RBAC.Scheam");
const { default: mongoose } = require("mongoose");
const { objectCopy, deleteInvalidPropertyInObject } = require("../../../../Utils/functions");

class PermissionController extends Controller {
    
    async addpermission(req, res, next){
        try {
            const {name, description} = await addPermissionScheam.validateAsync(req.body);
            await this.findPermissionWithName(name);
            const addPermissionResault = await PermissionModel.create({name, description});
            if(!addPermissionResault) throw new createHttpError.InternalServerError("سطح دسترسی ثبت نشد");
            return res.status(httpStatus.CREATED).json({
                StatusCode: httpStatus.CREATED,
                data: {
                    message: "سطح دسترسی ثبت شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllPermission(req, res, next){
        try {
            const permissions = await PermissionModel.find({});
            if(!permissions) throw new createHttpError.NotFound("سطح دسترسی یافت نشد");
            return res.status(httpStatus.OK).json({
                StatusCode: httpStatus.OK,
                data: {
                    permissions
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removePermission(req, res, next){
        try {
            const { id } = req.params;
            const permission = await this.findPermissionWithId(id);
            const removePermissionResault = await PermissionModel.deleteOne({_id: permission._id});
            if(!removePermissionResault.deletedCount) throw new createHttpError.InternalServerError("سطح دسترسی حذف نشد");
            return res.status(httpStatus.OK).json({
                StatusCode: httpStatus.OK,
                data: {
                    message: "سطح دسترسی با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updatePermissionWithId(req, res, next){
        try {
            const { id } = req.params;
            const permission = await this.findPermissionWithId(id);
            const data = objectCopy(req.body);
            deleteInvalidPropertyInObject(data);
            const updatePermissionResault = await PermissionModel.updateOne({_id: permission._id}, {$set: data});
            if(updatePermissionResault.modifiedCount == 0) throw new createHttpError.InternalServerError("به روز رسانی سطوح انجان نشد");
            return res.status(httpStatus.OK).json({
                StatusCode: httpStatus.OK,
                data: { 
                    message: "به روز رسانی سطوح با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findPermissionWithName(name){
        const permission = await PermissionModel.findOne({name});
        if(permission) throw new createHttpError.NotFound("سطح دسترسی از قبل ثبت شده است")
    }
    async findPermissionWithId(id){
        if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("شناسه وارد شده صحیح نمی باشد");
        const permission = await PermissionModel.findById(id);
        if(!permission) throw new createHttpError.NotFound("سطح دسترسی مورد نظر یافت نشد"); 
        return permission
    }
}

module.exports = {
    PermissionController: new PermissionController()
}