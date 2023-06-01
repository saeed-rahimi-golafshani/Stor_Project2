const router = require("express").Router();
const { checkPermission } = require("../../Http/Middlewares/permission.guard");
const { PERMISSIONS } = require("../../Utils/constants");
const { AdminApiBlogRoutes } = require("./blog");
const { AdminApiCategoryRoutes } = require("./category");
const { AdminApiChapterRoutes } = require("./chapter");
const { AdminApiCouresRouter } = require("./course");
const { AdminApiEpisodeRoutes } = require("./episode");
const { AdminApiPermissionRouter } = require("./permission");
const { AdminApiProductRouter } = require("./product");
const { AdminApiRoleRouter } = require("./role");
const { AdminApiUserRouter } = require("./user");
// -   name: prisma(Api) description: all method and routes

router.use("/category", checkPermission([PERMISSIONS.CONTENT_MANAGER]), AdminApiCategoryRoutes)
router.use("/blogs", checkPermission([PERMISSIONS.TEACHER]), AdminApiBlogRoutes)
router.use("/product", checkPermission([PERMISSIONS.CONTENT_MANAGER, PERMISSIONS.SUPLLIER]), AdminApiProductRouter)
router.use("/course", checkPermission([PERMISSIONS.TEACHER]), AdminApiCouresRouter)
router.use("/chapter", checkPermission([PERMISSIONS.TEACHER]), AdminApiChapterRoutes)
router.use("/episode", checkPermission([PERMISSIONS.TEACHER]), AdminApiEpisodeRoutes)
router.use("/user", AdminApiUserRouter)
router.use("/role", checkPermission([PERMISSIONS.ADMIN]), AdminApiRoleRouter)
router.use("/permission", checkPermission([PERMISSIONS.ADMIN]), AdminApiPermissionRouter)

module.exports = {
    AdminRoutes : router
}