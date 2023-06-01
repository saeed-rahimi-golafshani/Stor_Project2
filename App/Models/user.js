const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productId: {type: mongoose.Types.ObjectId, ref: "product"},
    count: {type: Number, default: 1}
});
const CourseSchema = new mongoose.Schema({
    courseId: {type: mongoose.Types.ObjectId, ref: "course"},
    count: {type: Number, default: 1}
});
const BasketSchema = new mongoose.Schema({
    products: {type: [ProductSchema], default: []},
    courses: {type: [CourseSchema], default: []}
})
const UserSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    username: {type: String, lowercase: true},
    mobile: {type: String, required: true},
    email: {type: String, lowercase: true },
    password: {type: String},
    otp: {type: Object, default: 
        {
            code: 0, 
            expiresIn: 0
        }},
    bills: {type: [], default: []},
    discount: {type: Number, default: 0},
    birthday: {type: String},
    Role: {type: String, default: "USER"},
    Courses: {type: mongoose.Types.ObjectId, ref: "course", default: []},
    Products: {type: mongoose.Types.ObjectId, ref: "product", default: []},
    basket: {type: BasketSchema} 
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
UserSchema.index({firstname: "text", lastname: "text", username: "text", mobile: "text", email: "text", roles: "text"});

module.exports ={
    UserModel : mongoose.model("user", UserSchema)
}