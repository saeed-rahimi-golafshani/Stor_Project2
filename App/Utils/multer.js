const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createError = require("http-errors")

function createRoute(req){
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    const directory = path.join(__dirname, "..", "..", "Public", "Uploads", "Blogs", year, month, day);
    req.body.fileUploadPath = path.join("Uploads", "Blogs", year, month, day)
    fs.mkdirSync(directory, {recursive: true});
    return directory;
}
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        if(file?.originalname){
            const filePath = createRoute(req);
            return cb(null, filePath)
        } 
        cb(null, null)
    },
    filename: (req, file, cb) =>{
         if(file?.originalname){
            const ext = path.extname(file.originalname)
            const fileName = String(new Date().getTime() + ext);
            req.body.filename = fileName
            return cb(null, fileName)
        } 
        cb(null, null)
    }
})
function fileFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimetypes = [".jpeg", "jpg", ".png", ".webp", ".gif", ".jfif"];
    if(mimetypes.includes(ext)){
        return cb(null, true)
    }
    return cb(createError.BadRequest("فرمت فایل ارسالی صحیح نمیباشد"))
}
function videoFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimetypes = [".mp4", ".mpg", ".mov", ".avi", ".mkv"];
    if(mimetypes.includes(ext)){
        return cb(null, true)
    }
    return cb(createError.BadRequest("فرمت ویدیو ارسالی صحیح نمیباشد"))
}
const pictureSize = 1 * 1000 * 1000;
const videoSize = 300 * 1000 * 1000;

const uploadFile = multer({storage, fileFilter, limits: {fileSize: pictureSize}});
const uploadVideo = multer({storage, videoFilter, limits: {fileSize: videoSize}});

module.exports = {
    uploadFile,
    uploadVideo
}