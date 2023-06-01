const { GraphQLString } = require("graphql");
const { ResponseType } = require("../TypeDefs/public.Types");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/verify-access-token");
const { checkExistProduct, checkExistCourse, checkExistBlog } = require("../utils");
const { ProductModel } = require("../../Models/product");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../Models/course");
const { BlogsModel } = require("../../Models/blog");

const DisLikeProduct = {
    type: ResponseType,
    args: {
        productId: {type: GraphQLString}
    },
    resolve: async (_, args, context) =>{
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { productId } =  args;
        await checkExistProduct(productId);
        const likeProduct = await ProductModel.findOne({
            _id: productId,
            likes: user._id
        });
        const dislikeProduct = await ProductModel.findOne({
            _id: productId,
            dislikes: user._id
        });
        const updateQuery = dislikeProduct? {$pull: {dislikes: user._id}} : {$push: {dislikes: user._id}}
        await ProductModel.updateOne({_id: productId}, updateQuery);
        let message;
        if(!dislikeProduct){
            if(likeProduct) await ProductModel.updateOne({_id: productId}, {$pull: {likes: user._id}})
            message = "نپسندیدن محصول با موفقیت انجام شد"
        } else {
            message = "نپسندیدن محصول لغو شد"
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
};
const DisLikeCourse = {
    type: ResponseType,
    args: {
        courseId: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { courseId } = args;
        await checkExistCourse(courseId);
        const likedCourse = await CourseModel.findOne({
            _id: courseId,
            likes: user._id
        });
        const dislikedCourse = await CourseModel.findOne({
            _id: courseId,
            dislikes: user._id
        });
        const updateQuery = dislikedCourse? {$pull: {dislikes: user._id}} : {$push: {dislikes: user._id}}
        await CourseModel.updateOne({_id: courseId}, updateQuery);
        let message;
        if(!dislikedCourse){
            if(likedCourse) await CourseModel.updateOne({_id: courseId}, {$pull: {likes: user._id}})
            message = "نپسندیدن مقاله با موفقیت انجام شد"
        }else {
            message = "نپسندیدن مقاله لغو شد"
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
};
const DisLikeBlog = {
    type: ResponseType,
    args: {
        blogId: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { blogId } = args;
        await checkExistBlog(blogId);
        const likedBlog = await BlogsModel.findOne({
            _id: blogId,
            likes: user._id
        });
        const disLikedBlog = await BlogsModel.findOne({
            _id: blogId,
            dislikes: user._id
        });
        const updateQuery = disLikedBlog? {$pull: {dislikes: user._id}} : {$push: {dislikes: user._id}};
        await BlogsModel.updateOne({_id: blogId}, updateQuery);
        let message;
        if(!disLikedBlog){
            if(likedBlog)  await BlogsModel.updateOne({_id: blogId}, {$pull: {likes: user._id}})
            message = "نپسندیدن مقاله با موفقیت انجام شد"
        } else {
            message = "نپسندیدن مقاله لغو شد"
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
}


module.exports = {
    DisLikeProduct,
    DisLikeCourse,
    DisLikeBlog
}