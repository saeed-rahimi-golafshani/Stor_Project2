const { GraphQLList } = require("graphql");
const { ProductType } = require("../TypeDefs/product.Type");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/verify-access-token");
const { ProductModel } = require("../../Models/product");
const { CourseType } = require("../TypeDefs/course.Type");
const { CourseModel } = require("../../Models/course");
const { BlogType } = require("../TypeDefs/blog.Type");
const { BlogsModel } = require("../../Models/blog");
const { AnyType } = require("../TypeDefs/public.Types");
const { getBasketOfUser } = require("../utils");

const getUserBookmarkProduct = {
    type: new GraphQLList(ProductType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const product = await ProductModel.find({bookmarks: user._id}).populate([
            {path: "category"},
            {path: "comments.user"},
            {path: "comments.answers.user"},
            {path: "likes"},
            {path: "dislikes"},
            {path: "bookmarks"},
            {path: "supplier"}
        ]);
        return product
    }
};
const getUserBookmarkCourse = {
    type: new GraphQLList(CourseType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const course = await CourseModel.find({bookmarks: user._id}).populate([
            {path: "category"},
            {path: "comments.user"},
            {path: "comments.answers.user"},
            {path: "likes"},
            {path: "dislikes"},
            {path: "bookmarks"},
            {path: "teacher"}
        ]);
        return course
    }
};
const getUserBookmarkBlog = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const blog = await BlogsModel.find({bookmarks: user._id}).populate([
            {path: "category"},
            {path: "comments.user"},
            {path: "comments.answers.user"},
            {path: "likes"},
            {path: "dislikes"},
            {path: "bookmarks"},
            {path: "author"}
        ]);
        return blog
    }
};
const getUserBasket = {
    type: AnyType,
    resolve: async (_, args, context) =>{
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const userDetail = await getBasketOfUser(user._id);
        return userDetail
    }
}

module.exports = {
    getUserBookmarkProduct,
    getUserBookmarkCourse,
    getUserBookmarkBlog,
    getUserBasket
}