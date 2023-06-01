const { GraphQLList, GraphQLString } = require("graphql");
const { ProductModel } = require("../../Models/product");
const { ProductType } =             require("../TypeDefs/product.Type");

const ProductResolve = {
    type: new GraphQLList(ProductType),
    resolve: async () => {
        return await ProductModel.find({}).populate([
            {path: "category"},
            {path: "supplier"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ])
    }
}
const ProductAccordingToCategoryResolve = {
    type: new GraphQLList(ProductType),
    args: {
        category: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { category } = args;
        const findQuery = category? {category} : {};
        return ProductModel.find(findQuery).populate([
            {path: "category"},
            {path: "supplier"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ]);
    }
}

module.exports = {
    ProductResolve,
    ProductAccordingToCategoryResolve
}