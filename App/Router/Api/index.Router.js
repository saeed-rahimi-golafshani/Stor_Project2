const router = require("express").Router();
const HomeController = require("../../Http/Controllers/Api/home.controller");
const { verifyAccessToken } =  require("../../Http/Middlewares/verify-access-token");

 
    /**
     * @swagger
     * /:
     *  get:
     *      summary: base of routes
     *      tags: [Index Page]
     *      description: data is description
     *      parameters: 
     *          -   in: header
     *              name: access-token
     *              example: Bearer YuorToken...               
     *      responses: 
     *               200: 
     *                  description: success
     *               404: 
     *                  description: not found
     */


    router.get("/", verifyAccessToken, HomeController.indexPage)
module.exports = {
    indexRoutes : router
}