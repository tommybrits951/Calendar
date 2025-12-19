const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name: String,
    location: String,
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Event", eventSchema)