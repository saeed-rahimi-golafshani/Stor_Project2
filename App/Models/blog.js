const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");

const blogSchema = new mongoose.Schema({
    author : {type: mongoose.Types.ObjectId, ref: "user", required: true},
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: [mongoose.Types.ObjectId], ref: "category", required: true},
    comments: {type: [commentSchema], default: []},
    likes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    dislikes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], ref: "user", default: []}
},{
    timestamps: true,
    toJSON: {
        virtuals: true 
    }
});
blogSchema.virtual("imageURL").get(function(){
    return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.image}`
});
blogSchema.virtual("user",{
    ref: "user",
    localField: "_id",
    foreignField: "author"
});
blogSchema.virtual("category_detail",{
    ref: "category",
    localField: "_id",
    foreignField: "category"
});

module.exports ={
    BlogsModel : mongoose.model("blog", blogSchema)
}