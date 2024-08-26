const mongoose = require("mongoose")

const Schema = mongoose.Schema

const FileSchema = new Schema({
    "file": {
        type: String,
        required: true
    },
    "user": {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})