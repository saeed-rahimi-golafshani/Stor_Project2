const path = require("path");
const Controller = require("../../controller");
const { createBlogSchema } = require("../../../Validations/Admin/blog.schema");
const { BlogsModel } = require("../../../../Models/blog");
const { deleteFileInPath } = require("../../../../Utils/functions");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");

class BlogController extends Controller{
    
    async createBlog(req, res, next){
        try {
           const blogDataBody = await createBlogSchema.validateAsync(req.body);
           req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.filename);
           req.body.image = req.body.image.replace(/\\/g, "/");
           const { title, text, short_text, tags, category } = blogDataBody;
           const image = req.body.image;
           const author = req.user._id; 
           const resault = await BlogsModel.create({title, image, text, short_text, tags, category, author})
           return res.status(httpStatus.CREATED).json({
               statusCode: httpStatus.CREATED,
            data: {
                message: "وبلاگ با موفقیت ثبت شده است" 
            }
           })
        } catch (error) {
            deleteFileInPath(req?.body?.image)
            next(error)
        } 
    }
    async getListOfBlog(req, res, next){
        try {
           const blogs = await BlogsModel.aggregate([
            {$match: {}},
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {
                $unwind: "$author"
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $project: {
                    "author.__v" : 0,
                    "author.otp" : 0,
                    "author.bills" : 0,
                    "author.discount" : 0,
                    "author.roles" : 0,
                    "category.__v": 0                    
                }
            }
           ])
           return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            data: {
                blogs
            }
           })
            
        } catch (error) {
            next(error)
        }
    }
    async getOneBlogById(req, res, next){
        try {
            const { id } = req.params;
            const blog = await this.findBlog({_id: id});
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data :{
                    blog
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async getCommentOfBlog(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async deleteBlogById(req, res, next){
        try {
            const { id } = req.params;
            await this.findBlog({_id: id});
            const resault = await BlogsModel.deleteOne({_id: id});
            if(resault.deletedCount == 0) throw createError.InternalServerError("مقاله حذف نشد") 
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "مقاله با موفقیت حذف شد"
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async UpdateBlogById(req, res, next){
        try {
            const { id } = req.params;
            await this.findBlog({_id: id});
            if(req?.body?.fileUploadPath && req?.body?.filename){
                req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
                req.body.image = req.body.image.replace(/\\/g, "/");
            }
            const data = req.body;
            const nullishData = ["", " ", 0, null, undefined, NaN];
            const blackListFields = ["likes", "dislikes", "bookmarks", "comments", "author"];
            Object.keys(data).forEach(key => {
                if(blackListFields.includes(key)) delete data[key];
                if(typeof data[key] == "string") data[key] = data[key].trim();
                if(Array.isArray(data[key]) && Array.length > 0) data[key] = data[key].map(item => item.trim())
                if(nullishData.includes(data[key])) delete data[key]
            })
            const resaultUpdate = await BlogsModel.updateOne({_id: id}, {$set: data});
            if(resaultUpdate.modifiedCount == 0) throw createError.InternalServerError("به روز رسانی انجام نشد")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
                }
            })
            
         } catch (error) {
             deleteFileInPath(req?.body?.image) 
             next(error)
         } 
    }
    async findBlog(query= {}){
        const blog = await BlogsModel.findOne(query).populate([{path: "category", select: ['title']}, {path: "author", select: ['mobile', 'firstname', 'lastname', 'username']}]);
        if(!blog) throw createError.NotFound("مقاله ای یافت نشد");
        return blog;
    }
}

module.exports ={ 
    AdminBlogController: new BlogController()
}