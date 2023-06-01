const { default: mongoose } = require("mongoose");

const RoleSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    permissions: {type: [mongoose.Types.ObjectId], ref: "perminssion", default: []},
    description: {type: String, default: ""}
}, {
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    RoleModel : mongoose.model("role", RoleSchema)
}