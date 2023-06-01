const router = require("express").Router(); 
const { RoleController } = require("../../Http/Controllers/Admin/RBAC/role.controller");
const { srtingToArray } = require("../../Http/Middlewares/stringToArray");

router.post("/add", srtingToArray("permissions"), RoleController.addRoles);
router.get("/list", RoleController.getListAllRoles);
router.delete("/remove/:field", RoleController.removeRoleWithFeild);
router.patch("/update/:id", srtingToArray("permissions"), RoleController.updateRoleWithId)

module.exports = {
    AdminApiRoleRouter: router
}