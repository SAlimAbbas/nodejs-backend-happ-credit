const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId:Number,
    title:String,
    body:String,
    comments:[]
});

const postModel = new mongoose.model("post",postSchema);

module.exports = postModel;