const { GraphQLString, GraphQLInt, NoUnusedFragmentsRule } = require("graphql")
const { ResponseType } = require("../TypeDefs/public.Types");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middlewares/verify-access-token");
const { checkExistProduct, checkExistCourse } = require("../utils");
const { UserModel } = require("../../Models/user");
const { objectCopy } = require("../../Utils/functions");
const { StatusCodes: httpStatus} = require("http-status-codes");
const { CourseModel } = require("../../Models/course");
const createHttpError = require("http-errors");

const AddProductToBasket = {
    type: ResponseType,
    args: {
        productId: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { productId } = args;
        await checkExistProduct(productId);
        const product = await findProductInBasket(user._id, productId)
        if(product){
            await UserModel.updateOne(
                {
                    _id: user._id,
                    "basket.products.productId": productId
                },
                {
                    $inc: {
                        "basket.products.$.count": 1
                    }
                }
            )
        } else {
            await UserModel.updateOne(
                {
                    _id: user._id
                }, 
                {
                    $push: {
                        "basket.products": {
                            productId,
                            count: 1
                        }
                    }
                }
            )
        }
        return {
            statusCode: httpStatus.OK,
            data: {
                message: "محصول به سبد خرید اضافه شد"
            }
        }
    }
};
const AddCourseToBasket = {
    type: ResponseType,
    args: {
        courseId: {type: GraphQLString}
    },
    resolve: async (_, args, context) =>{
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { courseId } = args;
        await checkExistCourse(courseId);
        const userCourse = await UserModel.findOne({_id: user._id, Courses: courseId})
        if(userCourse) throw new createHttpError.BadRequest("شما این دوره را قبلا خریداری کردید")
        const course = await findCourseInBasket(user._id, courseId);
        if(course){
           throw createHttpError.BadRequest("این دوره قبلا به سبد خرید اضافه شده است")
        } else {
            await UserModel.updateOne(
                {
                    _id: user._id
                },
                {
                    $push: {
                        "basket.courses": {
                           courseId,
                           count: 1 
                        }
                    }
                }
            )
        }
        return {
            statusCode: httpStatus.OK,
            data: {
                message: "دوره به سبد خرید اضافه شد"
            }    
        }
    }
}
const RemoveProductFromBasket = {
    type: ResponseType,
    args: {
        productId: {type: GraphQLString}
    },
    resolve: async (_, args, context) =>{
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { productId } = args;
        await checkExistProduct(productId)
        const product = await findProductInBasket(user._id, productId);
        if(!product) throw createHttpError.NotFound("محصول مورد نظر در سبد خرید یافت نشد")
        if(product.count > 1){
            await UserModel.updateOne(
                {
                    _id: user._id,
                    "basket.products.productId": productId
                }, {
                    $inc: {
                        "basket.products.$.count": -1
                    }
                }
            )
        } else {
            await UserModel.updateOne(
                {
                    _id: user._id,
                    "basket.products.productId": productId
                }, {
                    $pull: {
                        "basket.products": {
                            productId
                        }
                    }
                }
            )
        }
        return {
            statusCode: httpStatus.OK,
            data: {
                message: "محصول از سبد خرید حذف شد"
            }
        }
    }
}
const RemoveCourseFromBasket = {
    type: ResponseType,
    args: {
        courseId: {type: GraphQLString}
    },
    resolve: async (_, args, context) =>{
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { courseId } = args;
        await checkExistCourse(courseId);
        const course = await findCourseInBasket(user._id, courseId);
        if(!course) throw createHttpError.NotFound("دوره در سبد خرید یافت نشد")
        if(course.count > 1){
            await UserModel.updateOne(
                {
                    _id: user._id,
                    "basket.courses.courseId": courseId
                }, {
                    $inc: {
                        "basket.courses.$.count": -1
                    }
                }
            )
        } else {
            await UserModel.updateOne(
                {
                    _id: user._id,
                    "basket.courses.courseId": courseId
                }, {
                    $pull: {
                        "basket.courses": {
                            courseId
                        }
                    }
                }
            )
        } 
        return {
            statusCode: httpStatus.OK,
            data: {
                message: "دوره از سبد خرید حذف شد"
            }
        }
    }
}
async function findProductInBasket(userID, productID){
    const basketProduct = await UserModel.findOne({
        _id: userID,
        "basket.products.productId": productID }, {
            "basket.products.$": 1
        })
    const product = objectCopy(basketProduct);
    return product?.basket?.products?.[0]
}
async function findCourseInBasket(userID, courseID){
    const basketCourse = await UserModel.findOne(
        {
            _id: userID, 
            "basket.courses.courseId": courseID
        }, {
            "basket.courses.$": 1
        });
    const course = objectCopy(basketCourse);
    return course?.basket?.courses?.[0]
}

module.exports = {
    AddProductToBasket,
    AddCourseToBasket,
    RemoveProductFromBasket,
    RemoveCourseFromBasket
}