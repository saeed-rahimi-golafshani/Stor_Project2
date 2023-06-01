const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLScalarType } = require("graphql");
const { CommentType } = require("./comment.Type");
const { UserType, PublicCategoryType } = require("./public.Types");

const FetureType = new GraphQLObjectType({
    name: "FetureType",
    fields: {
        length: {type: GraphQLString},
        height: {type: GraphQLString},
        width: {type: GraphQLString},
        weight: {type: GraphQLString},
        colors: {type: new GraphQLList(GraphQLString)},
        model: {type: new GraphQLList(GraphQLString)},
        madeIn: {type: GraphQLString}
    }
})
const ProductType = new GraphQLObjectType({
    name: "ProductType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        images: {type: new GraphQLList(GraphQLString)},
        imageURL: {type: new GraphQLList(GraphQLString)},
        tags: {type: new GraphQLList(GraphQLString)},
        price: {type: GraphQLInt},
        discount: {type: GraphQLInt},
        count: {type: GraphQLInt},
        type: {type: GraphQLString},
        category: {type: PublicCategoryType},
        supplier: {type: UserType},
        feture: {type: FetureType},
        comments: {type: new GraphQLList(CommentType)},
        likes: {type: new GraphQLList(UserType)},
        dislikes: {type: new GraphQLList(UserType)},
        bookmarks: {type: new GraphQLList(UserType)}
    }
})

module.exports = {
    ProductType
}