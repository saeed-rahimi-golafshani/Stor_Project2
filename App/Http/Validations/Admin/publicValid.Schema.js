const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN  } = require("../../../Utils/constants")

const ObjectIdValidator = joi.object({
    id: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("شناسه وارد شده اشتباه است"))
});

module.exports = {
    ObjectIdValidator
}