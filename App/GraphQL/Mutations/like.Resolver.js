const { GraphQLString } = require("graphql")
const { ResponseType } = require("../TypeDefs/public.Types");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/verify-access-token");
const { checkExistProduct, checkExistBlog, checkExistCourse } = require("../utils");
const { ProductModel } = require("../../Models/product");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { BlogsModel } = require("../../Models/blog");
const { CourseModel } = require("../../Models/course");

const LikeBlog = {
    type: ResponseType,
    args: {
        blogId: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { blogId } = args;
        await checkExistBlog(blogId);
        const likeBlog = await BlogsModel.findOne({
            _id: blogId,
            likes: user._id
        });
        const disLikeBlog = await BlogsModel.findOne({
            _id: blogId,
            dislikes: user._id          
        });
        const findQuery = likeBlog? {$pull: {likes: user._id}} : {$push: {likes: user._id}};
        await BlogsModel.updateOne({_id: blogId}, findQuery)
        let message
        if(!likeBlog){
            if(disLikeBlog) await BlogsModel.updateOne({_id: blogId}, {$pull: {dislikes: user._id}})
            message = "پسندیدن مقاله با موفقیت انجام شد"
        } else {
            message = "پسندیدن مقاله لغو شد"
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
};
const LikeCourse = {
    type: ResponseType,
    args: {
        courseId: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { courseId } = args;
        await checkExistCourse(courseId);
        const likeCourse = await CourseModel.findOne({
            _id: courseId,
            likes: user._id
        });
        const disLikeCourse = await CourseModel.findOne({
            _id: courseId,
            dislikes: user._id          
        });
        const findQuery = likeCourse? {$pull: {likes: user._id}} : {$push: {likes: user._id}};
        await CourseModel.updateOne({_id: courseId}, findQuery)
        let message
        if(!likeCourse){
            if(disLikeCourse) await CourseModel.updateOne({_id: courseId}, {$pull: {dislikes: user._id}})
            message = "پسندیدن دروه با موفقیت انجام شد"
        } else {
            message = "پسندیدن دوره لغو شد"
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
};
const LikeProduct = {

    type: ResponseType,
    args : {
        productId: {type: GraphQLString}
    },
    resolve : async (_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphQL(req)
        const {productId} = args
        await checkExistProduct(productId)
        let likedproduct = await ProductModel.findOne({
            _id: productId,
            likes : user._id
        })
        let disLikedproduct = await ProductModel.findOne({
            _id: productId,
            dislikes : user._id
        })
        const updateQuery = likedproduct? {$pull:{likes: user._id}} : {$push: {likes: user._id}}
        await ProductModel.updateOne({ _id: productId }, updateQuery)
        let message
        if(!likedproduct){
            if(disLikedproduct) await ProductModel.updateOne({ _id: productId }, {$pull: {dislikes: user._id}})
            message = "پسندیدن محصول با موفقیت انجام شد"
        } else message = "پسندیدن محصول لغو شد"
        return {
            statusCode: httpStatus.CREATED,
            data : {
                message
            }
        }
    }
    // type: ResponseType,
    // args: {
    //     productId: {type: GraphQLString}
    // },
    // resolve: async (_, args, context) => {
    //     const { req } = context;
    //     const user = verifyAccessTokenInGraphQL(req);
    //     const { productId } = args;
    //     await checkExistProduct(productId);
    //     const likeProduct = await ProductModel.findOne({
    //         _id: productId,
    //         likes: user._id
    //     });
    //     const dislikeProduct = await ProductModel.findOne({
    //         _id: productId,
    //         dislikes: user._id
    //     });
    //     const updateQuery = likeProduct? {$pull: {likes: user._id}} : {$push: {likes: user._id}};
    //     await ProductModel.updateOne({_id: productId}, updateQuery);
    //     let message;
    //     if(!likeProduct){
    //         if(dislikeProduct) await ProductModel.updateOne({_id: productId}, {$pull: {dislikes: user._id}})
    //         message = "پسندیدن محصول با موفقیت انجام شد"
    //     } else{
    //         message = "پسندیدن محصول لغو شد"
    //     }
    //     return {
    //         statusCode: httpStatus,
    //         data: {
    //             message
    //         }
    //     }        
    // }
};

module.exports = {
    LikeBlog,
    LikeCourse,
    LikeProduct
}