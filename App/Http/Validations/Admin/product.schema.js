const joi = require("joi");
const { MONGOID_PATTERN } = require("../../../Utils/constants")
const createError = require("http-errors")

const createProductSchema = joi.object({
    title: joi.string().min(3).max(30).error(createError.BadRequest("عنوان محصول صحیح نمیباشد")),
    short_text: joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    text: joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    category: joi.string().regex(MONGOID_PATTERN).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    tags: joi.array().min(0).max(30).error(createError.BadRequest("برچسب ها بیشتر از بیست آیتم نمیتواند باشد")),
    price: joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
    discount: joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    count: joi.number().error(createError.BadRequest("تعداد وارد شده صحیح نمیباشد")),
    weight: joi.number().allow(null, 0, "0").error(createError.BadRequest("وزن وارد شده صحیح نمیباشد")),
    length: joi.number().allow(null, 0, "0").error(createError.BadRequest("عرض وارد شده صحیح نمیباشد")),
    width: joi.number().allow(null, 0, "0").error(createError.BadRequest("طول وارد شده صحیح نمیباشد")),
    height: joi.number().allow(null, 0, "0").error(createError.BadRequest("ارتفاع وارد شده صحیح نمیباشد")),
    type: joi.string().regex(/(virtual|physical)/i),
    filename: joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp|\.gif|\.jfif)$/).error(createError.BadRequest(" فرمت تصویر ارسال شده صحیح نمیباشد")) ,
    fileUploadPath: joi.allow()
})

module.exports = {
    createProductSchema
}
