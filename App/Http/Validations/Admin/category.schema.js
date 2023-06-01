const joi = require("joi");
const { MONGOID_PATTERN } = require("../../../Utils/constants");

const addCategorySchema = joi.object({
    title: joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    parent: joi.string().allow('').pattern(MONGOID_PATTERN).allow('').error(new Error("شناسه ارسال شده صحیح نمیباشد"))
})

const updateCategorySchema = joi.object({
    title: joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد"))
})

module.exports = {
    addCategorySchema,
    updateCategorySchema
}