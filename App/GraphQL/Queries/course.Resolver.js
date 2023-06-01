const { GraphQLList, GraphQLString } = require("graphql");
const { CourseType } = require("../TypeDefs/course.Type");
const { CourseModel } = require("../../Models/course");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/verify-access-token");

const CourseResolve = {
    type: new GraphQLList(CourseType),
    resolve: async(_, args, context) =>{
        const { req } = context;
        req.user = await verifyAccessTokenInGraphQL(req);
        const course = await CourseModel.find({}).populate([
            {path: "category"},
            {path: "teacher"},
            {path: "comments.user"},
            {path: "comments.answers.user"}
        ]);
        return course
    }
}
const CourseAccordingToCategoryResolve = {
    type: new GraphQLList(CourseType),
    args: {
        category: {type: GraphQLString}
    },
    resolve: async(_, args) =>{
        const { category } = args;
        const findQuery = category? {category} : {};
        return await CourseModel.find(findQuery).populate([
            {path: "category"},
            {path: "teacher"},
            {path: "comments.user"},
            {path: "comments.answers.user"}

        ]);
    }
}

module.exports = {
    CourseResolve,
    CourseAccordingToCategoryResolve
}