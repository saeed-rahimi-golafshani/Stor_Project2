const { GraphQLList, GraphQLString } = require("graphql");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/verify-access-token");
const { CategoryModel } = require("../../Models/category");
const { CategoryType } = require("../TypeDefs/category.Type");

const CategoryResolver = {
    type: new GraphQLList(CategoryType),
    resolve: async(_, args, context) => {
        const {req} = context;
        req.user = await verifyAccessTokenInGraphQL(req);
        const catgories = await CategoryModel.find({parent: undefined});
        return catgories
    } 
}
const CategoryChildResolver = {
    type: new GraphQLList(CategoryType),
    args: {
        parent: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { parent } = args;
        const catgories = await CategoryModel.find({parent});
        return catgories
    } 
}

module.exports = {
    CategoryResolver,
    CategoryChildResolver
}