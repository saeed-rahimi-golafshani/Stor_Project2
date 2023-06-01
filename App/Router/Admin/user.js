const { UserController } = require("../../Http/Controllers/Admin/User/user.Controller");
const { checkPermission } = require("../../Http/Middlewares/permission.guard");
const { PERMISSIONS } = require("../../Utils/constants");
const router = require("express").Router();

    router.get("/list", checkPermission([PERMISSIONS.ADMIN]), UserController.getAllUser);
    router.patch("/update-profile", UserController.updateUserProfile);
    router.get("/profile", checkPermission([]), UserController.UserProfile)

module.exports = {
    AdminApiUserRouter: router
}