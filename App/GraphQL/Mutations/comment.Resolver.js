const { GraphQLString } = require("graphql");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/verify-access-token");
const { BlogsModel } = require("../../Models/blog");
const { StatusCodes: httpStatus} = require("http-status-codes");
const { ResponseType } = require("../TypeDefs/public.Types");
const { objectCopy } = require("../../Utils/functions");
const { checkExistBlog, checkExistCourse, checkExistProduct } = require("../utils");
const { CourseModel } = require("../../Models/course");
const { ProductModel } = require("../../Models/product");

const CreateCommentForBlog = {
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        blogId: {type: GraphQLString},
        parent: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const {comment, blogId, parent} = args;
        if(!mongoose.isValidObjectId(blogId)) throw new createHttpError.BadRequest("شناسه بلاگ ارسال شده صحیح نمی باشد");
        await checkExistBlog(blogId);
        if(parent && mongoose.isValidObjectId(parent)){
            const commentDocument = await getComment(BlogsModel, parent);  
            if(commentDocument && !commentDocument?.opentocomment) throw new createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
            const createAnswerResault = await BlogsModel.updateOne({
                "comments._id": parent
            }, {
                $push: {
                    "comments.$.answers": {
                        comment,
                        user: user._id,
                        show: false,
                        opentocomment: false
                    }
                }
            });
            if(!createAnswerResault.modifiedCount){
                throw new createHttpError.InternalServerError("ثبت پاسخ انجام نشد")
            } 
            return {
                statusCode: httpStatus.CREATED,
                data: {
                    message: "ثبت پاسخ با موفقیت انجام شد"
                }
            }
        }else {
            await BlogsModel.updateOne({_id: blogId}, {
                $push: {comments: { 
                    comment,
                    user: user._id,
                    show: false,
                    opentocomment: true
                }}
            });
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message: "ثبت نظر با موفقیت انجام شد، بعد از تایید مدیر سایت ثبت خواهد شد"
            }
        }
    }
};
const CreateCommentForProduct = {
    type: ResponseType,
    args : {
        comment: {type: GraphQLString},
        productId: {type: GraphQLString},
        parent: {type: GraphQLString},
    },
    resolve : async (_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphQL(req)
        const {comment, productId, parent} = args
        if(!mongoose.isValidObjectId(productId)) throw createHttpError.BadRequest("شناسه محصول ارسال شده صحیح نمیباشد")
        await checkExistProduct(productId)
        if(parent && mongoose.isValidObjectId(parent)){
            const commentDocument = await getComment(ProductModel, parent);
            if(commentDocument && !commentDocument?.openToComment) throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست")
            const createAnswerResult = await ProductModel.updateOne({
                "comments._id": parent
            }, {
                $push: {
                    "comments.$.answers": {
                        comment,
                        user: user._id,
                        show: false,
                        openToComment: false
                    }
                }
            });
            if(!createAnswerResult.modifiedCount) {
                throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد")
            }
            return {
                statusCode: httpStatus.CREATED,
                data : {
                    message: "پاسخ شما با موفقیت ثبت شد"
                }
            }
        }else{
            await ProductModel.updateOne({_id: productId}, {
                $push : {comments : {
                    comment, 
                    user: user._id, 
                    show : false,
                    openToComment : true
                }}
            })
        }
        return {
            statusCode: httpStatus.CREATED,
            data : {
                message: "ثبت نظر با موفقیت انجام شد پس از تایید در وبسایت قرار میگیرد"
            }
        }
    }
};
const CreateCommentForCourse = {
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        courseId: {type: GraphQLString},
        parent: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const {comment, courseId, parent} = args;
        if(!mongoose.isValidObjectId(courseId)) throw new createHttpError.BadRequest("شناسه دوره ارسال شده صحیح نمی باشد");
        await checkExistCourse(courseId);
        if(parent && mongoose.isValidObjectId(parent)){
            const commentDocument = await getComment(CourseModel, parent);  
            if(commentDocument && !commentDocument?.opentocomment) throw new createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
            const createAnswerResault = await CourseModel.updateOne({
                "comments._id": parent
            }, {
                $push: {
                    "comments.$.answers": {
                        comment,
                        user: user._id,
                        show: false,
                        opentocomment: false
                    }
                }
            });
            if(!createAnswerResault.modifiedCount){
                throw new createHttpError.InternalServerError("ثبت پاسخ انجام نشد")
            } 
            return {
                statusCode: httpStatus.CREATED,
                data: {
                    message: "ثبت پاسخ با موفقیت انجام شد"
                }
            }
        }else {
            await CourseModel.updateOne({_id: courseId}, {
                $push: {comments: { 
                    comment,
                    user: user._id,
                    show: false,
                    opentocomment: true
                }}
            });
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message: "ثبت نظر با موفقیت انجام شد، بعد از تایید مدیر سایت ثبت خواهد شد"
            }
        }
    }
};

async function getComment(model, id){
    const findComment = await model.findOne({"comments._id": id}, {"comments.$": 1});
    const comment = objectCopy(findComment)
    if(!comment?.comments?.[0]) throw new createHttpError.NotFound("کامنتی با این مشخصات یافت نشد");
    console.log(comment?.comments?.[0]);
    return comment?.comments?.[0]
}

module.exports = {
    CreateCommentForBlog,
    CreateCommentForCourse,
    CreateCommentForProduct
}

//  spiderman 2