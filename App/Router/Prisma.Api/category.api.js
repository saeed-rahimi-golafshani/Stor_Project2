const router = require("express").Router();
const prisma = (new (require("@prisma/client")).PrismaClient())
const createError = require("http-errors");

/**
 * @swagger 
 *  /category/list:
 *      get:
 *          tags: [prisma(Api)]
 *          summary: get list of category with postgres and prisma
 *          responses: 
 *                  200:
 *                      description: success
 */

router.get("/list", async(req, res, next) =>{
    try {
        const categories = await prisma.category.findMany({});
        return res.status(200).json({
            statusCode: 200,
            categories
        })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger 
 *  /category/add:
 *      post:
 *          tags: [prisma(Api)]
 *          summary: create new category with postgres and prisma
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  name: name
 *                  required: true 
 *          responses: 
 *                  201:
 *                      description: created
 */

router.post("/add", async(req, res, next) =>{
    try {
        const {name} = req.body;
        const category = await prisma.category.create({
            data: {name}
        })
        if(!category) throw createError.InternalServerError("دسته بندی افزوده نشد")
        return res.status(201).json({
            data: {
                statusCode: 201,
                message: "ایجاد دسته بندی با موفقیت انجام شد",
                category
            }
        })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger 
 *  /category/remove/{id}:
 *      delete:
 *          tags: [prisma(Api)]
 *          summary: delete category by id with postgres and prisma
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true 
 *          responses: 
 *                  200:
 *                      description: success
 */

router.delete("/remove/:id", async(req, res, next) =>{
    try {
        const {id} = req.params;
        await findCategoryWithId(id)
        const category = await prisma.category.delete({where: {id: Number(id)}})
        if(!category) throw createError.InternalServerError("دسته بندی حذف نشد")
        return res.status(200).json({
            data: {
                statusCode: 200,
                message: "حذف دسته بندی با موفقیت انجام شد"
            }
        })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger 
 *  /category/update/{id}:
 *      put :
 *          tags: [prisma(Api)]
 *          summary: update a category by id with postgres and prisma
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true 
 *              -   in: formData
 *                  type: string
 *                  name: name
 *                  required: true
 *          responses: 
 *                  200:
 *                      description: success
 */

router.put("/update/:id", async(req, res, next) =>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await prisma.category.upsert({
            where: {id: Number(id)},
            create: {name, id: Number(id)},
            update: {name}
        })
        if(!category) throw createError.InternalServerError("دسته بندی ویرایش نشد")
        return res.status(200).json({
            data: {
                statusCode: 200,
                message: "دسته بندی با موفقیت به روز رسانی شد"
            }
        })
    } catch (error) {
        next(error)
    }
})

async function findCategoryWithId(id){
    const categoryExist = await prisma.category.findUnique({where: {id: Number(id)}})
        if(!categoryExist) throw createError.NotFound("دسته بندی یافت نشد")
        return categoryExist
}

module.exports = {
    categoryApiPrisma: router
}