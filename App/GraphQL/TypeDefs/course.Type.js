const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { CommentType } = require("./comment.Type");
const { UserType, PublicCategoryType } = require("./public.Types");

const EpisodeType = new GraphQLObjectType({
    name: "EpisodeType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        text: {type: GraphQLString},
        type: {type: GraphQLString},
        time: {type: GraphQLString},
        videoAddress: {type: GraphQLString},
        videoAddressURL : {type: GraphQLString}

    }
});
const ChapterType = new GraphQLObjectType({
    name: "ChapterType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        text: {type: GraphQLString},
        episodes: {type: new GraphQLList(EpisodeType)},
        
    }
});
const CourseType = new GraphQLObjectType({
    name: "CourseType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        image: {type: GraphQLString},
        imageURL: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        price: {type: GraphQLInt},
        discount: {type: GraphQLInt},
        count: {type: GraphQLInt},
        type: {type: GraphQLString},
        category: {type: new GraphQLList(PublicCategoryType)},
        status: {type: GraphQLString},
        teacher: {type: UserType},
        chapters: {type: new GraphQLList(ChapterType)},
        comments: {type: new GraphQLList(CommentType)},
        likes: {type: new GraphQLList(UserType)},
        dislikes: {type: new GraphQLList(UserType)},
        bookmarks: {type: new GraphQLList(UserType)}
    }
})

module.exports = {
    CourseType
}