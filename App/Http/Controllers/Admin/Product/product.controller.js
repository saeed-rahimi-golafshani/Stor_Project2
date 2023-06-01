const createError = require("http-errors");
const Controller = require("../../controller")
const { ProductModel } = require("../../../../Models/product");
const { objectIdVlidator } = require("../../../Validations/public.validator");
const { createProductSchema } = require("../../../Validations/Admin/product.schema")
const { deleteFileInPath, listOfImagesFromRequest, setfeture, objectCopy, deleteInvalidPropertyInObject } = require("../../../../Utils/functions");
const { StatusCodes: httpStatus } = require("http-status-codes");

const productBlackList = {
    LIKES: "likes",
    DISLIKES: "dislikes",
    BOOKMARKS: "bookmarks",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    LENGHT: "lenght",
    HEIGHT: "height",
    WIDTH: "width",
    WEIGHT: "weight",
    COLOR: "color"
}
Object.freeze(productBlackList)

class ProductController extends Controller{
    
    async addProduct(req, res, next){
        try {
            const images = listOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
            const productDataBody = await createProductSchema.validateAsync(req.body);
            const { title, short_text, text, tags, category, price, discount, count, type} = productDataBody;
            const supplier = req.user._id;
            let fetures = setfeture(req.body);
            const product = await ProductModel.create({
                title,
                short_text,
                text,
                tags,
                category,
                price,
                discount,
                count,
                fetures,
                type,
                supplier,
                images,
            });
            if(!product) throw createError.InternalServerError("محصول ثبت نشد")
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "محصول با موفقیت ثبت شد"
                }
            })
           
        } catch (error) {
            deleteFileInPath(req?.body?.image)
            next(error)
        }
    }
    async getAllProduct(req, res, next){
        try {
            const search = req?.query?.search || "";
            let products;
            if(search){
                products = await ProductModel.findOne({
                    $text: {
                        $search: new RegExp(search, "ig")
                    }
                })
            } else{
                products = await ProductModel.find({});
            }
            if(!products) throw createError.NotFound("محصولی یافت نشد")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    products
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getOneProduct(req, res, next){
        try {
            const { id } = req.params;
            const product = await this.findProductById(id);
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    product
                }
            }) 
        } catch (error) {
            next(error)
        }
    }
    async editProduct(req, res, next){
        try {
            const { id } = req.params;
            const product = await this.findProductById(id)
            const data = objectCopy(req.body);
            data.images = listOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
            data.fetures = setfeture(req.body);
            let blackListFeilds = Object.values(productBlackList);
            deleteInvalidPropertyInObject(data, blackListFeilds);
            const updateResault = await ProductModel.updateOne({_id: product._id}, {$set: data})
            if(updateResault.modifiedCount == 0) throw {status: httpStatus.INTERNAL_SERVER_ERROR, message: "خطای سروری از ساو"}
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "بروز رسانی با موفقیت انجام شد"
                }
            })

        } catch (error) {
            next(error)
        } 
    }
    async removeProduct(req, res, next){
        try {
            const { id } = req.params;
            const product = await this.findProductById(id);
            const deleteProductById = await ProductModel.deleteOne({_id: product._id});
            if(deleteProductById.deletedCount == 0) throw createError.InternalServerError("محصول مورد نظر حذف نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "محصول با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findProductById(productId){
        const { id } = await objectIdVlidator.validateAsync({id: productId});
        const product = await ProductModel.findById(id);
        if(!product) throw createError.NotFound("محصولی یافت نشد")
        return product
    }
 
}

module.exports = {
    ProductController: new ProductController() 
}