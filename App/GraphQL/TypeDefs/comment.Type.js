const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLInt } = require("graphql");
const { UserType } = require("./public.Types");

const CommentAnswerType = new GraphQLObjectType({
    name: "CommentAnswerType",
    fields: {
        _id: {type: GraphQLString},
        user: {type: UserType},
        comment: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        show: {type: GraphQLBoolean},
        
    }
});
const CommentType = new GraphQLObjectType({
    name: "Commenttype",
    fields: {
        _id: {type: GraphQLString},
        user: {type: UserType},
        comment: {type: GraphQLString},
        answers: {type: new GraphQLList(CommentAnswerType)},
        show: {type: GraphQLBoolean},
        opentocomment: {type: GraphQLBoolean},
        createdAt: {type: GraphQLString}
    }
});

module.exports = {
    CommentType
}