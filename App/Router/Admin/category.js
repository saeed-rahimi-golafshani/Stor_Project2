const {CategoryController} = require("../../Http/Controllers/Admin/Category/category.controller");
const router = require("express").Router();


router.post("/add", CategoryController.addCategory)
router.get("/parents", CategoryController.getAllParents)
router.get("/children/:parent", CategoryController.getChildOfparents)
router.get("/all", CategoryController.getAllCategory)
router.get("/list-of-all", CategoryController.getAllCatergoryWithOutPopulate)
router.patch("/update/:id", CategoryController.editCategoryTitle)
router.delete("/remove/:id", CategoryController.removeCategory)
router.get("/:id", CategoryController.getCategoryById) 

module.exports = {
    AdminApiCategoryRoutes: router
}