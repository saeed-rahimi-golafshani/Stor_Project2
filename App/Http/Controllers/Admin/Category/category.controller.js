const createError = require("http-errors");
const { CategoryModel } = require("../../../../Models/category");
const { addCategorySchema, updateCategorySchema } = require("../../../Validations/Admin/category.schema");
const Controller = require("../../controller");
const mongoose = require("mongoose");
const { StatusCodes: httpStatus} = require("http-status-codes")

class CategoryController extends Controller{

   
    async addCategory(req, res, next){
        try {
            const {title, parent} = req.body;
            await addCategorySchema.validateAsync(req.body)
            const category = await CategoryModel.create({title, parent});
            if(!category) throw createError.InternalServerError("خطای سروری")
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "دسته بندی با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllCategory(req, res, next){

        try {
            // const category = await CategoryModel.aggregate([
            //     {
            //          $graphLookup: {
            //              from: "categories",
            //              startWith: "$_id",   
            //              connectFromField: "-id",
            //              connectToField: "parent",
            //              maxDepth: 5,
            //              depthField: "depth",
            //              as: "childern"
            //          }
            //      },
            //      {
            //          $project: {
            //              __v: 0,
            //              "childern.__v": 0,
            //              "childern.parent": 0
            //          }
            //      },
            //      {
            //          $match: {
            //              parent: undefined
            //          }
            //      }
            // ])
            // return res.status(200).json({
            //     data:{
            //             category
            //         }
            // })
            const categories = await CategoryModel.find({parent: undefined});
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    categories
                }
            })
        } catch (error) {
            next(error)
        }

        // lookup تنها در یک سطح به ما دسترسی میدهد
        // try {
        //     const category = await CategoryModel.aggregate([
        //         {
        //             $lookup: {
        //                 from: "categories",
        //                 localField: "_id",
        //                 foreignField: "parent",
        //                 as: "childern"
        //             }
        //         },
        //         {
        //             $project: {
        //                 __v: 0,
        //                 "childern.__v": 0,
        //                 "childern.parent": 0
        //             }
        //         },
        //         {
        //             $match: {
        //                 parent: undefined
        //             }
        //         }
        //     ])
        //     return res.status(200).json({
        //         data: {
        //             category
        //         }
        //     })
        // } catch (error) {
        //     next(error)
        // }
    }
    async getCategoryById(req, res, next){
        try {
            const {id: _id} = req.params;
            const category = await CategoryModel.aggregate([
                {
                    $match: {_id: mongoose.Types.ObjectId(_id)}
                },  
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "childern"
                        }
                },
                {
                    $project: {
                        __v: 0,
                        "childern.__v": 0,
                        "childern.parent": 0
                    }
                }
                              
            ]);

            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    category                   
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllParents(req, res, next){
        try {
            const parents = await CategoryModel.find({parent: undefined},{__v: 0});
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    parents
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getChildOfparents(req, res, next){
        try {
            const { parent } = req.params;
            const parents = await CategoryModel.find({parent},{__v: 0, parent: 0})
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    parents
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async getAllCatergoryWithOutPopulate(req, res, next){
        try {
            const categories = await CategoryModel.aggregate([
                {$match: {}}
            ]);
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async editCategoryTitle(req, res, next){
        try {
            const {id} = req.params;
            const {title} = req.body;
            await this.checkExistCategory(id);
            await updateCategorySchema.validateAsync(req.body);
            const updateresult = await CategoryModel.updateOne({_id: id}, {$set: {title}});
            if(updateresult.modifiedCount == 0) throw createError.InternalServerError("دسته بندی به روز رسانی نشد")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "دسته بندی با موفقیت به روز رسانی شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req, res, next){
        try {
            const {id} = req.params;
            const category = await this.checkExistCategory(id);
            const deletResult = await CategoryModel.deleteMany({$or: [
                {_id: category._id},
                {parent: category._id}
            ]});
            if(deletResult.deletedCount == 0) throw createError.InternalServerError("حذف دسته بندی با موفقیت انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "حذف دسته بندی با موفقیت انجام شد"
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async checkExistCategory(id){
        const category = await CategoryModel.findById(id);
        if(!category) throw createError.NotFound("دسته بندی یافت نشد")
        return category
    }
}

module.exports = {
    CategoryController: new CategoryController()
}