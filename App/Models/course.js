const { default: mongoose } = require("mongoose");
const { getTimeOfCourse } = require("../Utils/functions");
const { commentSchema } = require("./public.schema");

const Episode = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    type: {type: String, default: "unlock"},
    time: {type: String, required: true},
    videoAddress: {type: String, required: true}
}, {
    toJSON: {
        virtuals: true
    }
});
Episode.virtual("videoAddressURL").get(function(){
    return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`
});
const Chapter = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, default: ""},
    episodes: {type: [Episode], default: []}
})
const CouresSchema = new mongoose.Schema({
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    comments: {type: [commentSchema], default: []},
    likes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    dislikes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    type: {type: String, default: "free", required: true},
    status: {type: String, required: true, default: "NotStarted"},
    teacher: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    chapters: {type: [Chapter], default: []},
    students: {type: [mongoose.Types.ObjectId], default: [], ref: "user"}
    
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
CouresSchema.index({title: "text", short_text: "text", text: "text"});
CouresSchema.virtual("imageURL").get(function(){
    return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.image}`
});
CouresSchema.virtual("totalTime").get(function(){
    return getTimeOfCourse(this.chapters)
})

module.exports ={
    CourseModel : mongoose.model("course", CouresSchema)
}