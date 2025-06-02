const mongoose = require('mongoose')

const AccountantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    employee_code: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    phone_number: {
        type: String,
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
        type: String,
        default: null,
    },
    SalaryTable: {
        type: String,
        required: true,
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('accountant', AccountantSchema)

