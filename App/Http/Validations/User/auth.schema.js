const joi = require("joi");

const getOtpSchema = joi.object({
    mobile : joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("موبایل وارد شده نادرست است"))
})

const checkOtpSchema = joi.object({
    mobile: joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("موبایل وارد شده نادرست است")),
    code: joi.string().min(4).max(6).error(new Error("کد ارسال شده صحیح نمی باشد"))
})
module.exports = {
    getOtpSchema,
    checkOtpSchema
}