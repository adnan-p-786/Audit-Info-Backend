const mongoose = require('mongoose')

const BranchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    admins: {
        type: String,
        required: true,
    },
    SRC: {
        type: String,
        required: true,
    },
    SRO: {
        type: String,
        required: true,
    },
    administractor: {
        type: String,
        required: true,
    },
    Lead: {
        type: String,
        required: true,
    },
    SchoolManagement: {
        type: String,
        required: true,
    },
    CollegeManagement: {
        type: String,
        required: true,
    },
    Accounts: {
        type: String,
        required: true,
    },
    RegistrationTable: {
        type: String,
        required: true,
    },
    Expense: {
        type: String,
        required: true,
    },
    SendAmount: {
        type: String,
        required: true,
    },
    SalaryTable: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});


module.exports = mongoose.model('branch', BranchSchema)

