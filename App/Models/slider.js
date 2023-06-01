const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    title: {type: String},
    text: {type: String},
    Image: {type: String, required: true},
    type: {type: String, default: "MAIN"}
})

module.exports ={
    SliderModel : mongoose.model("slider", schema)
}