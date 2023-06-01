const { UserAuthConteroller } = require("../../Http/Controllers/User/Auth/auth");
const router = require("express").Router();

router.post("/get-otp", UserAuthConteroller.getOtp)
router.post("/check-otp", UserAuthConteroller.checkOtp)
router.post("/refresh-token", UserAuthConteroller.refreshToken)

module.exports = { 
    authRoutes : router
}