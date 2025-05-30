const mongoose = require('mongoose')

const UserModelSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: String,
        required: true,
    },
    employee_code: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    is_admin: {
        type: Boolean,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    status: {
        type: String,
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
    branch: {
        type: String,
        required: true,
    },
    branchId: {
        type: String,
        required: true,
    },
    refresh: {
        type: String,
        required: true,
    },
    point_amount: {
        type: String,
        required: true,
    },
    managerPoint: {
        type: String,
        required: true,
    },
    SalaryTable: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model('User', UserModelSchema)

