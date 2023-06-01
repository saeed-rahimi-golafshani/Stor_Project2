const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver, GetBlogByIdResolver, GetBlogAccordingToCategory } = require("./Queries/blog.Resolver");
const { CategoryResolver, CategoryChildResolver } = require("./Queries/category.Resolver");
const { CourseResolve, CourseAccordingToCategoryResolve } = require("./Queries/course.Resolver");
const { ProductResolve, ProductAccordingToCategoryResolve } = require("./Queries/product.Resolver");
const { CreateCommentForBlog, CreateCommentForCourse, CreateCommentForProduct } = require("./Mutations/comment.Resolver")
const { LikeProduct, LikeBlog, LikeCourse } = require("./Mutations/like.Resolver");
const { DisLikeProduct, DisLikeCourse, DisLikeBlog } = require("./Mutations/dislike.Resolver");
const { BookmarkProduct, BookmarkCourse, BookmarkBlog } = require("./Mutations/bookmark.Resolver");
const { getUserBookmarkProduct, getUserBookmarkCourse, getUserBookmarkBlog, getUserBasket } = require("./Queries/user.Profile.Resolver");
const { AddProductToBasket, AddCourseToBasket, RemoveProductFromBasket, RemoveCourseFromBasket } = require("./Mutations/basket.Resolver")


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        blogwithId: GetBlogByIdResolver,
        blogAccordingToCategory: GetBlogAccordingToCategory,
        product: ProductResolve,
        ProductAccordingToCategory: ProductAccordingToCategoryResolve,
        category: CategoryResolver,
        childofcategory: CategoryChildResolver,
        course: CourseResolve,
        CourseAccordingToCategoryResolve: CourseAccordingToCategoryResolve,
        getUserBookmarkProduct: getUserBookmarkProduct,
        getUserBookmarkCourse: getUserBookmarkCourse,
        getUserBookmarkBlog: getUserBookmarkBlog,
        getUserBasket: getUserBasket
    }
});
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateCommentForBlog,
        CreateCommentForCourse,
        CreateCommentForProduct,
        LikeProduct,
        LikeBlog,
        LikeCourse,
        DisLikeProduct,
        DisLikeCourse,
        DisLikeBlog,
        BookmarkProduct,
        BookmarkCourse,
        BookmarkBlog,
        AddProductToBasket,
        AddCourseToBasket,
        RemoveProductFromBasket,
        RemoveCourseFromBasket
    }
});
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

module.exports = {
    graphQLSchema
}