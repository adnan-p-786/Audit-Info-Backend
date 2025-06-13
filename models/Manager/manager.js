const mongoose = require('mongoose')

const ManagerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    employee_code: {
        type: String,
        unique: true,
    },
    phone_number: {
        type: Number,
        required: true,
    },
    date_of_joining: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    refresh: {
        type: Boolean,
        default: true,
    },
    point_amount: {
        type: Number,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    }
});


module.exports = mongoose.model('Manager', ManagerSchema)

