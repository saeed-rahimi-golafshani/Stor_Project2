const { Promise } = require("mongoose");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path =  require("path");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constants");
const { UserModel } = require("../Models/user");
const createHttpError = require("http-errors");
const redisClient = require("./init-redis")

function randomNumberGenerator(){
    const randomnumber = (Math.floor(Math.random() * 90000) + 10000);
    return randomnumber
}
function signAccessToken(userId){
    return new Promise(async (resolve, reject) =>{
        const user = await UserModel.findById(userId);
        const payload = {
            mobile : user.mobile
        };
        const options = {
            expiresIn: "1y"
        };
        jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) =>{
            if(err) reject(createHttpError.InternalServerError("خطای سروری"))
            resolve(token)
        })
    })
}
function signRefreshToken(userId){
    return new Promise(async (resolve, reject) =>{
        const user = await UserModel.findById(userId);
        const payload = {
            mobile : user.mobile
        };
        const option = {
            expiresIn : "1y"
        }
        jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, option, async (err, token) =>{
            if(err) reject(createHttpError.InternalServerError("خطای سروری"))
            await redisClient.SETEX(userId, (365*24*60*60), token)
            resolve(token)    
        })
    }) 
}
function verifyRefreshToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) =>{
            if(err) reject(createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید"))
            const {mobile} = payload || {}
            const user = await UserModel.findOne({mobile}, {password: 0, otp: 0})
            if(!user) reject(createHttpError.Unauthorized("حساب کاربری یافت نشد"))
            const refreshToken = await redisClient.get(user?._id || "key_default");
            if(!refreshToken) reject(createHttpError.Unauthorized("ورود مجدد به حساب کاربری مکان پذیر نسیت، لطفا دوباره تلاش کنید"))
            if(token === refreshToken) return resolve(mobile)
            reject(createHttpError.Unauthorized("ورود مجدد به حساب کاربری مکان پذیر نسیت، لطفا دوباره تلاش کنید"))
        }) 
    })
}
function deleteFileInPath(fileAddress){
   if(fileAddress){
    const pathFile = path.join(__dirname, "..", "..", "Public", fileAddress);
    if(fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
   }
}
function listOfImagesFromRequest(files, fileUploadPath){
    if(files?.length > 0){
        return (files.map(file => path.join(fileUploadPath, file.filename)).map(item => item.replace(/\\/g, "/")));
    } else {
        return []
    }
}
function setfeture(body){
    const {width, length, height, weight, color} = body;
    let feture = {};
    feture.color = color;
    if(!isNaN(+width) || !isNaN(+length) || !isNaN(+height) || !isNaN(+weight)){
        if(!width) feture.width = 0;
        if(!length) feture.length = 0;
        else feture.width = +width;
        if(!height) feture.height = 0;
        else feture.length = +length;
        if(!weight) feture.weight = 0;
        else feture.height = +height;
    }
    return feture
}
function objectCopy(object){
    return JSON.parse(JSON.stringify(object));
}
function deleteInvalidPropertyInObject(data = {}, blackListFeilds = []){
    let nullishData = ["", " ", 0, null, NaN, undefined];
    Object.keys(data).forEach(key => {
        if(blackListFeilds.includes(key)) delete data[key];
        if(typeof data[key] == "string") data[key] = data[key].trim();
        if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
        if(Array.isArray(data[key]) && data[key].length == 0) delete data[key]
        if(nullishData.includes(data[key])) delete data[key]; 
    });
    return data
}
function getTime(seconds) {
    let total = Math.round(seconds) / 60;
    let [minutes, second] = String(total).split(".");
    second = Math.round((second * 60) / 100).toString().substring(0, 2);
    let houre = 0;
    if (minutes > 60) {
        total = minutes / 60
         let [h1, m1] = String(total).split(".");
         houre = h1,
         minutes = Math.round((m1 * 60) / 100).toString().substring(0, 2);
    }
    if(String(houre).length == 1) houre = `0${houre}`;
    if(String(minutes).length == 1) minutes = `0${minutes}`;
    if(String(second).length == 1) second = `0${second}`;
    return (houre + ":" + minutes + ":" +second)
}
function getTimeOfCourse(chapters = []){
    let time, houre, minute, second = 0;
    for (const chapter of chapters) {
        if(Array.isArray(chapter?.episodes)){
            for (const episode of chapter.episodes) {
                if(episode?.time) time = episode.time.split(":");
                else time = "00:00:00".split(":");
                if(time.length == 3){
                    second += Number(time[0]) * 3600;
                    second += Number(time[1]) * 60;
                    second += Number(time[2]);
                } else if(time.length == 2){
                    second += Number(time[0]) * 60;
                    second += Number(time[1]);
                } else if(time.length == 1){
                    second += Number(time[0]);
                }
            }
        }
    }
    houre = Math.floor(second / 3600);
    minute = Math.floor(second / 60) % 60;
    second = Math.floor(second%60);
    if(String(houre).length == 1) houre = `0${houre}`;
    if(String(minute).length == 1) minute = `0${minute}`;
    if(String(second).length == 1) second = `0${second}`;
    return (houre + ":" + minute + ":" + second)
}

module.exports = {
    randomNumberGenerator,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    deleteFileInPath, 
    listOfImagesFromRequest,
    setfeture,
    objectCopy,
    deleteInvalidPropertyInObject,
    getTime,
    getTimeOfCourse
}