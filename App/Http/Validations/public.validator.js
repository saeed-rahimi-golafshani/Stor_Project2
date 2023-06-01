const createHttpError = require("http-errors");
const Joi = require("joi");
const { MONGOID_PATTERN } = require("../../Utils/constants");

const objectIdVlidator = Joi.object({
    id: Joi.string().pattern(MONGOID_PATTERN).error(new Error(createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد")))
})

module.exports = {
    objectIdVlidator
}
