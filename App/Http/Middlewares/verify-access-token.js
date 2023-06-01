const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../Models/user");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../Utils/constants");

function getToken(headers){
    const [bearer, token] = headers?.authorization?.split(" ") || [];
if(token && ["Bearer", "bearer"].includes(bearer)) return token
}
function verifyAccessToken(req, res, next){
    try {
        const token = getToken(req.headers);
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, (async(err, payload)=>{
            try {
                if(err) throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
                const { mobile } = payload || {};
                const user = await UserModel.findOne({mobile}, {password: 0, otp: 0})
                if(!user) throw createHttpError.Unauthorized("حساب کاربری یافت نشد")
                req.user = user;
                return next()
            } catch (error) {
                next(error)
            }
        }))
    } catch (error) {
        next(error)
    }    
}
async function verifyAccessTokenInGraphQL(req, res){
    try {
        const token = getToken(req.headers);
        const { mobile } = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY)
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );
        if (!user) throw new createHttpError.Unauthorized("حساب کاربری یافت نشد");
        return user
      } catch (error) {
        throw new createHttpError.Unauthorized()
      }
}

module.exports = {
    verifyAccessToken,
    verifyAccessTokenInGraphQL
}