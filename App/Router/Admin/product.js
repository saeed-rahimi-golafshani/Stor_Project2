const router = require("express").Router();
const { ProductController } = require("../../Http/Controllers/Admin/Product/product.controller");
const { uploadFile } = require("../../Utils/multer")
const { srtingToArray } = require("../../Http/Middlewares/stringToArray")

router.post("/add", uploadFile.array("images", 10), srtingToArray("tags"), ProductController.addProduct);
router.get("/list", ProductController.getAllProduct);
router.get("/:id", ProductController.getOneProduct);
router.delete("/delete/:id", ProductController.removeProduct);
router.patch("/edit/:id", uploadFile.array("images", 10), srtingToArray("tags"), ProductController.editProduct);

module.exports = { 
    AdminApiProductRouter: router 
}