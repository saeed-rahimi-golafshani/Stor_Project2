const joi = require("joi");
const { MONGOID_PATTERN } = require("../../../Utils/constants")
const createError = require("http-errors")

const createCourseSchema = joi.object({
    title: joi.string().min(3).max(30).error(createError.BadRequest("عنوان دوره صحیح نمیباشد")),
    short_text: joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    text: joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    category: joi.string().regex(MONGOID_PATTERN).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    tags: joi.array().min(0).max(30).error(createError.BadRequest("برچسب ها بیشتر از بیست آیتم نمیتواند باشد")),
    price: joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
    discount: joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    type: joi.string().regex(/(free|cash|special)/i),
    type: joi.string().regex(/(NotStarted|Completed|Holding)/i),
    filename: joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp|\.gif|\.jfif)$/).error(createError.BadRequest(" فرمت تصویر ارسال شده صحیح نمیباشد")) ,
    fileUploadPath: joi.allow()
});
const createEpisodeSchema = joi.object({
    title: joi.string().min(3).max(30).error(createError.BadRequest("عنوان دوره صحیح نمیباشد")),    
    text: joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    type: joi.string().regex(/(unlock|lock)/i),
    chapterId: joi.string().regex(MONGOID_PATTERN).error(createError.BadRequest("شناسه ی فصل صحیح نمی باشد")),
    courseId: joi.string().regex(MONGOID_PATTERN).error(createError.BadRequest("شناسه ی دوره صحیح نمی باشد")),
    filename: joi.string().pattern(/(\.mp4|\.mpg|\.mov|\.avi|\.mkv)$/).error(createError.BadRequest(" فرمت تصویر ارسال شده صحیح نمیباشد")) ,
    fileUploadPath: joi.allow()
   
})

module.exports = {
    createCourseSchema,
    createEpisodeSchema
}
