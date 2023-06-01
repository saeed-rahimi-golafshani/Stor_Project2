const { PermissionController } = require("../../Http/Controllers/Admin/RBAC/permission.controller");

const router = require("express").Router();
    router.post("/add", PermissionController.addpermission);
    router.get("/list", PermissionController.getAllPermission);
    router.delete("/remove/:id", PermissionController.removePermission);
    router.patch("/update/:id", PermissionController.updatePermissionWithId)
module.exports = {
    AdminApiPermissionRouter: router
}