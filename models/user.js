const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types //to maake an relation between both models


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    like: [{
        type: Object
    }]
})

mongoose.model("User", userSchema)
