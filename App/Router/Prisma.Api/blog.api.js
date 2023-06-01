// const router = require("express").Router();
// const prisma = (new (require("@prisma/client")).PrismaClient())
// const createError = require("http-errors");
// // const category = require("../Admin/category");

// /**
//  * @swagger 
//  *  /blog/list:
//  *      get:
//  *          tags: [prisma(Api)]
//  *          summary: get list of blog with postgres and prisma
//  *          responses: 
//  *                  200:
//  *                      description: success
//  */

// router.get("/list", async(req, res, next) =>{
//     try {
//         const blogs = await prisma.blog.findMany({include: {category: true}});
//         return res.status(200).json({
//             data: {
//                 statusCode: 200,
//                 blogs
//             }
//         })

//     } catch (error) {
//         next(error)
//     }
// })

// /**
//  * @swagger 
//  *  /blog/add:
//  *      post:
//  *          tags: [prisma(Api)]
//  *          summary: upsert blog with postgres and prisma
//  *          parameters: 
//  *              -   in: formData
//  *                  name: title
//  *                  type: string
//  *                  required: true
//  *              -   in: formData
//  *                  name: text
//  *                  type: string
//  *                  required: true
//  *              -   in: formData
//  *                  name: short_text
//  *                  type: string
//  *                  required: true
//  *              -   in: formData
//  *                  name: category_id
//  *                  type: string
//  *                  required: true
//  *              -   in: formData
//  *                  name: id
//  *                  type: string
//  *                  required: true
//  *          responses: 
//  *                  201:
//  *                      description: success || create
//  */
// router.post("/add", async(req, res, next) =>{
//     try {
//         const {title, text, short_text, category_id, id} = req.body;
//         const {data} = req.body;
//         const blog = await prisma.blog.upsert({
//         where: {id : Number(id)},
//         create: {title, text,short_text,category_id: parseInt(category_id)},
//         update: {...data}
//     })
//     if(!blog) throw createError.InternalServerError(" ثبت تغییرات انجام نشد")
//     return res.status(201).json({
//         data: {
//             statusCode: 201,
//             message: "ثبت تغییرات با موفقیت انجام شد"
//         }
//     })
//     } catch (error) {
//         next(error)
//     }
// })

// module.exports = {
//     blogApiPrisma: router
// }