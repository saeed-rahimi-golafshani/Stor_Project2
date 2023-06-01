const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const { CommentType } = require("./comment.Type");
const { UserType, PublicCategoryType } = require("./public.Types");

const BlogType = new GraphQLObjectType({
    name: "blogType",
    fields: {
        _id: {type: GraphQLString},
        author : {type: UserType},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        image: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: PublicCategoryType},
        imageURL: {type: GraphQLString},
        comments: {type: new GraphQLList(CommentType)},
        likes: {type: new GraphQLList(UserType)},
        dislikes: {type: new GraphQLList(UserType)},
        bookmarks: {type: new GraphQLList(UserType)}
    }
});

module.exports = {
    BlogType
}