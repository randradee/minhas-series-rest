const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    comment: String,
});

const SerieSchema = mongoose.Schema({
    name: {
        type: String,
    },
    status: {
        type: String,
        enumValues: ["to-watch", "watching", "watched"],
    },
    comments: [CommentSchema],
});

const Serie = mongoose.model("Serie", SerieSchema);

module.exports = Serie;
