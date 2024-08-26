const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    files: [Schema.Types.ObjectId] // users can have multiple files. populate() method will pull in associated information when needed
})

module.exports = mongoose.model("User", UserSchema) // export model, it is interface to our database

