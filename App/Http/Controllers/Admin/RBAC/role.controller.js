const Controller = require("../../controller");
const { RoleModel } = require("../../../../Models/role");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { addRoleScheam } = require("../../../Validations/Admin/RBAC.Scheam");
const { default: mongoose } = require("mongoose");
const { deleteInvalidPropertyInObject, objectCopy } = require("../../../../Utils/functions");

class RoleController extends Controller {
    
    async addRoles(req, res, next){
        const {title, permissions, description} = await addRoleScheam.validateAsync(req.body);
        await this.findRoleWithTitle(title);
        const addRoleResault = await RoleModel.create({title, permissions,description});
        if(!addRoleResault) throw new createHttpError.InternalServerError("نقشض یا رولی ثبت نشد")
        return res.status(httpStatus.CREATED).json({
            StatusCode: httpStatus.CREATED,
            data: {
                message: "نقش یا رول با موفقیت ثبت شد"
            }
        })
    }
    async getListAllRoles(req, res, next){
        try {
            const roles = await RoleModel.find({}).populate([{path: "permissions"}]);
            if(!roles) throw new createHttpError.NotFound("عملیاتی یافت نشد");
            return res.status(httpStatus.OK).json({
                StatusCode: httpStatus.OK,
                data: {
                    roles
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeRoleWithFeild(req, res, next){
        try {
            const { field } = req.params;
            const role = await this.findRoleWithIdOrTitle(field);
            const removeRoleResault = await RoleModel.deleteOne({_id: role._id});
            if(!removeRoleResault.deletedCount) throw new createHttpError.InternalServerError("حذف نقش انجام نشد");
            return res.status(httpStatus.OK).json({
                StatusCode: httpStatus.OK,
                data: {
                    message: "حذف نقش با موفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async updateRoleWithId(req, res, next){
        try {
            const { id } = req.params;
            const role = await this.findRoleWithIdOrTitle(id);
            const data = objectCopy(req.body);
            deleteInvalidPropertyInObject(data);
            const updateRoleResault = await RoleModel.updateOne({_id: role._id}, {$set: data});
            if(updateRoleResault.modifiedCount == 0) throw new createHttpError.InternalServerError("به روز رسانی نقش انجام نشد");
            return res.status(httpStatus.OK).json({
                StatusCode: httpStatus.OK,
                data: {
                    message: "به روزرسانی نقش یا رول با موفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async findRoleWithTitle(title){
        const role = await RoleModel.findOne({title});
        if(role) throw new createHttpError.BadRequest("این نقش یا رول از قبل وجود دارد")
    }
    async findRoleWithIdOrTitle(field){
        let findQuery = mongoose.isValidObjectId(field)? {_id: field}:{title: field};
        const role = await RoleModel.findOne(findQuery);
        if(!role) throw new createHttpError.NotFound("نقش مورد نظر یافت نشد")
        return role
    }
}
 
module.exports = {
    RoleController: new RoleController()
}