const { GraphQLList, GraphQLString, GraphQLObjectType } = require("graphql");
const { BlogType } = require("../TypeDefs/blog.Type");
const { BlogsModel } = require("../../Models/blog");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/verify-access-token");
const user = require("../../Models/user");

const BlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        const {req} = context;
        req.user = await verifyAccessTokenInGraphQL(req)
        console.log(req.user);
        return await BlogsModel.find({}).populate([
            {path: "author"},
            {path: "category"}
        ])
    }
}
const GetBlogByIdResolver = {
    type: new GraphQLList(BlogType),
    args: {
        id: {type: GraphQLString}
    },
    resolve: async (_, args) => {
        const {id} = args;
        const blog = await BlogsModel.find({_id: id}).populate([
            {path: "author"},
            {path: "category"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ])
        return blog
    }
}
const GetBlogAccordingToCategory = {
    type: new GraphQLList(BlogType),
    args: {
        category: {type: GraphQLString}
    },
    resolve: async(_, args) =>{
        const { category } = args;
        const findQuery = category? {category} : {};
        return await BlogsModel.find(findQuery).populate([
            {path: "category"},
            {path: "author"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ]);
    }
}

module.exports = {
    BlogResolver,
    GetBlogByIdResolver,
    GetBlogAccordingToCategory
}