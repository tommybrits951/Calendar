const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name: String,
    location: String,
    address: String,
    postal: {
        type: Number,
        min: 10001,
        max: 99999,
        required: false
    },
    contact_name: String,
    
    contact_phone: {
        type: Number,
        min: 1111111111,
        max: 9999999999,
        required: false
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model("Event", eventSchema)