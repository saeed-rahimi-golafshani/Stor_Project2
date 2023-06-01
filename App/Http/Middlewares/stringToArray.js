// tag1#tag2#tag3
// string     ====>>>> [...values] || [value] || []
// undefiend || null
// const srtingToArray = function(feild){
//     return function(req, res, next){
//         if(req.body[feild]){
//             if(typeof req.body[feild] == "string"){
//                 if(req.body[feild].indexOf("#") >= 0){
//                     req.body[feild] = req.body[feild].split("#").map(item => item.trim())
//                 }
//                 else if(req.body[feild].indexOf(",") >= 0){
//                     req.body[feild] = req.body[feild].split(",").map(item => item.trim())
//                 } else {
//                     req.body[feild] = [req.body[feild]];
//                 }
//             }else if((req.body[feild].constructor).toString().toLowerCase().indexOf("array") >=0 ){
//                 req.body[feild] = req.body[feild].map(item => item.trim())
//             }
//         } else {
//             req.body[feild] = []
//         }
//         next();
//     }
// }

// module.exports = {
//     srtingToArray
// }

const srtingToArray = function(...args) {
    return function(req, res, next) {
        const fields = args;
        fields.forEach(field => {
            if(req.body[field]){
                if(typeof req.body[field] == "string"){
                    if(req.body[field].indexOf("#") >=0){
                        req.body[field] = (req.body[field].split("#")).map(item => item.trim())
                    }else if(req.body[field].indexOf(",") >=0){
                        req.body[field] = (req.body[field].split(",")).map(item => item.trim())
                    }else{ 
                        req.body[field] = [req.body[field]]
                    }
                }
                if(Array.isArray(req.body[field])){
                    req.body[field] = req.body[field].map(item => item.trim())
                    req.body[field] = [... new Set(req.body[field])]
                }
            }else{
                req.body[field] = []
            }
        })
        next()
    }
}
module.exports = {
    srtingToArray
}























