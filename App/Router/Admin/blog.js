const router = require("express").Router();
const { AdminBlogController } = require("../../Http/Controllers/Admin/Blog/blog.controller");
const { uploadFile } = require("../../Utils/multer");
const { srtingToArray } = require("../../Http/Middlewares/stringToArray")


router.get("/", AdminBlogController.getListOfBlog)
router.post("/add",uploadFile.single("image"), srtingToArray("tags"), AdminBlogController.createBlog)
router.patch("/update/:id",uploadFile.single("image"), srtingToArray("tags"), AdminBlogController.UpdateBlogById)
router.delete("/delete/:id", AdminBlogController.deleteBlogById)
router.get("/:id", AdminBlogController.getOneBlogById)

module.exports ={    
    AdminApiBlogRoutes: router
}
