const { GraphQLString } = require("graphql");
const { ResponseType } = require("../TypeDefs/public.Types");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/verify-access-token");
const { checkExistProduct, checkExistCourse, checkExistBlog } = require("../utils");
const { ProductModel } = require("../../Models/product");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../Models/course");
const { BlogsModel } = require("../../Models/blog");

const BookmarkProduct = {
    type: ResponseType,
    args: {
        productId: {type: GraphQLString}
    },
    resolve: async(_, args, context) =>{
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { productId } = args;
        await checkExistProduct(productId);
        let bookmarkedProduct = await ProductModel.findOne({
            _id: productId,
            bookmarks: user._id
        });
        const updateQuery = bookmarkedProduct? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}};
        await ProductModel.updateOne({_id: productId}, updateQuery);
        let message;
        if(!bookmarkedProduct){
            message = "محصول به لیست علاقه مند های شما اضافه شد"
        } else{
            message = "محصول از لیست علاقه مندی های شما حذقف شد"
        }     
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
};
const BookmarkCourse = {
    type: ResponseType,
    args: {
        courseId: {type: GraphQLString}
    },
    resolve: async(_, args, context) =>{
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { courseId } = args;
        await checkExistCourse(courseId);
        let bookmarkedCourse = await CourseModel.findOne({
            _id: courseId,
            bookmarks: user._id
        });
        const updateQuery = bookmarkedCourse? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}};
        await CourseModel.updateOne({_id: courseId}, updateQuery);
        let message;
        if(!bookmarkedCourse){
            message = "محصول به لیست علاقه مند های شما اضافه شد"
        } else{
            message = "محصول از لیست علاقه مندی های شما حذقف شد"
        };
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
};
const BookmarkBlog = { 
    type: ResponseType,
    args: {
        blogId: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { blogId } = args;
        await checkExistBlog(blogId);
        let bookmarkedBlog = await BlogsModel.findOne({
            _id: blogId,
            bookmarks: user._id
        });
        const updateQuery = bookmarkedBlog? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}};
        await BlogsModel.updateOne({_id: blogId}, updateQuery);
        let message;
        if(!bookmarkedBlog){
            message = "مقاله به لیست علاقه مندی های شما اضافه شد" 
        } else {
            message = "مقاله از لیست علاقه مندی های شما حذف شد"
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
    BookmarkProduct,
    BookmarkCourse,
    BookmarkBlog
}