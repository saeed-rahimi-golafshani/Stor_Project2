const { GraphQLObjectType, GraphQLString, GraphQLScalarType, GraphQLList } = require("graphql");
const { toObject, parseLiteral } = require("../utils");

const AnyType = new GraphQLScalarType({
    name: "AnyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral
})
const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: {
        _id: {type: GraphQLString},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString},
    }
});
const PublicCategoryType = new GraphQLObjectType({
    name: "PublicCategoryType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString}
    }
})
const ResponseType = new GraphQLObjectType({
    name: "ResponseType",
    fields: {
        statusCode: {type: GraphQLString},
        data: {type: AnyType}
    }
})

module.exports = {
    UserType,
    PublicCategoryType,
    AnyType,
    ResponseType
}

