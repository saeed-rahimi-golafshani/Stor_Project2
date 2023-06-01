const { blogApiPrisma } = require("./Prisma.Api/blog.api");
const { categoryApiPrisma } = require("./Prisma.Api/category.api");
const redisClient = require("../Utils/init-redis");
const { AdminRoutes } = require("./Admin/admin.routes");
const { indexRoutes } = require("./Api/index.Router");
const { DeveloperRoutes } = require("./developer-routes");
const { authRoutes } = require("./User/auth");
const { verifyAccessToken } = require("../Http/Middlewares/verify-access-token");
const { graphqlHTTP } = require("express-graphql");
(async() =>{
    await redisClient.set("key", "value")
    const value = await redisClient.get("key");
    console.log(value);
})()
const { graphqlConfig } = require("../Utils/graphql.config")
const router = require("express").Router();

    router.use("/user", authRoutes)
    router.use("/admin", verifyAccessToken, AdminRoutes)
    router.use("/graphql", graphqlHTTP(graphqlConfig))
    router.use("/", indexRoutes)
    // router.use("/developer", DeveloperRoutes)
    // router.use("/blog", blogApiPrisma)
    // router.use("/category", categoryApiPrisma)

module.exports = {
    AllRoutes : router
}