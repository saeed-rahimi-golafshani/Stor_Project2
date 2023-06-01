const { Kind } = require("graphql");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { BlogsModel } = require("../Models/blog");
const { CourseModel } = require("../Models/course");
const { ProductModel } = require("../Models/product");
const { objectCopy } = require("../Utils/functions");

function parseObject(valueNode) {
    const value = Object.create(null);
    valueNode.fields.forEach(field => {
        value[field.name.value] = parseValueNode(field.value)
    })
    return value
}
function parseValueNode(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
            return parseObject(valueNode.value)
        case Kind.LIST:
            return valueNode.values.map(parseValueNode)
        default:
            return null;
    }
}
function parseLiteral(valueNode){
    switch(valueNode.kind) {
        case Kind.STRING:
            return valueNode.value.charAt(0) === '{'? JSON.parse(valueNode.value): valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT: 
                
    }
}
function toObject(value){
    if(typeof value === 'object'){
        return value
    }
    if(typeof value === "string" && value.charAt(0) === "{"){
        return JSON.parse(value)
    }
    return null
}
async function checkExistBlog(id){
    if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد");
    const blog = await BlogsModel.findById(id);
    if(!blog) throw new createHttpError.NotFound("مقاله ای یافت نشد");
    return blog
}
async function checkExistCourse(id){
    if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد");
    const course = await CourseModel.findById(id);
    if(!course) throw new createHttpError.NotFound(" دوره ای یافت نشد");
    return course
}
async function checkExistProduct(id){
    if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد")
    const product = await ProductModel.findById(id);
    if(!product) throw createHttpError.NotFound("محصولی یافت نشد")
    return product
}
async function getBasketOfUser(userID){
    const userDetail = await UserModel.aggregate([
        {
            $match : { _id: userID }
        },
        {
            $project:{ basket: 1}
        },
        {
            $lookup: {
                from: "products",
                localField: "basket.products.productId",
                foreignField: "_id",
                as: "productDetail"
            }
        },
        {
            $lookup: {
                from: "courses",
                localField: "basket.courses.courseId",
                foreignField: "_id",
                as: "courseDetail"
            }
        },
        {
            $addFields : {
                "productDetail" : {
                    $function: {
                        body: function(productDetail, products){
                            return productDetail.map(function(product){
                                const count = products.find(item => item.productId.valueOf() == product._id.valueOf()).count;
                                const totalPrice = count * product.price
                                return {
                                    ...product,
                                    basketCount: count,
                                    totalPrice,
                                    finalPrice: totalPrice - ((product.discount / 100) * totalPrice)
                                }
                            })
                        },
                        args: ["$productDetail", "$basket.products"],
                        lang: "js"
                    }
                },
                "courseDetail" : {
                    $function: {
                        body: function(courseDetail){
                            return courseDetail.map(function(course){
                                return {
                                    ...course,
                                    finalPrice: course.price - ((course.discount / 100) * course.price)
                                }
                            })
                        },
                        args: ["$courseDetail"],
                        lang: "js"
                    }
                },
                "payDetail" : {
                    $function: {
                        body: function(courseDetail, productDetail, products){
                            const courseAmount =  courseDetail.reduce(function(total, course){
                                return total + (course.price - ((course.discount / 100) * course.price))
                            }, 0)
                            const productAmount =  productDetail.reduce(function(total, product){
                                const count = products.find(item => item.productId.valueOf() == product._id.valueOf()).count
                                const totalPrice = count * product.price;
                                return total + (totalPrice - ((product.discount / 100) * totalPrice))
                            }, 0)
                            const courseIds = courseDetail.map(course => course._id.valueOf())
                            const productIds = productDetail.map(product => product._id.valueOf())
                            return {
                                courseAmount,
                                productAmount,
                                paymentAmount : courseAmount + productAmount,
                                courseIds,
                                productIds
                            }
                        },
                        args: ["$courseDetail", "$productDetail", "$basket.products"],
                        lang: "js"
                    }
                },
            }
        },{
            $project: {
                basket: 0
            }
        }
    ]);
    return objectCopy(userDetail)
}
module.exports = {
    parseObject,
    parseValueNode,
    parseLiteral,
    toObject,
    checkExistBlog,
    checkExistCourse,
    checkExistProduct,
    getBasketOfUser
}