const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN } = require("../../../Utils/constants");

const addRoleScheam = joi.object({
    title: joi.string().min(3).max(15).error(createHttpError.BadRequest("عنوان نقش صحیح نمیباشد")),
    description: joi.string().error(createHttpError.BadRequest("توضیحات برای نقش اشتباه است")),
    permissions: joi.array().items(joi.string().pattern(MONGOID_PATTERN)).error(createHttpError.BadRequest("سطوح دسترسی برای نقش صحیح نمیباشد"))
});
const addPermissionScheam = joi.object({
    name: joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان نقش صحیح نمیباشد")),
    description: joi.string().error(createHttpError.BadRequest("توضیحات برای نقش اشتباه است"))
});

module.exports = {
    addRoleScheam,
    addPermissionScheam
}