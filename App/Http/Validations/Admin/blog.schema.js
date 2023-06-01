const joi = require("joi");
const { MONGOID_PATTERN } = require("../../../Utils/constants")
const createError = require("http-errors")

const createBlogSchema = joi.object({
    title: joi.string().min(3).max(30).error(createError.BadRequest("عنوان بلاگ صحیح نمیباشد")),
    text: joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    short_text: joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    filename: joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp|\.gif|\.jfif)$/).error(createError.BadRequest(" فرمت تصویر ارسال شده صحیح نمیباشد")) ,
    tags: joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها بیشتر از بیست آیتم نمیتواند باشد")),
    category: joi.string().pattern(MONGOID_PATTERN).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    fileUploadPath: joi.allow()
})



module.exports = {
    createBlogSchema
}
