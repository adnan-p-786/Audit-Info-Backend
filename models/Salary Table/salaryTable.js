const mongoose = require('mongoose')

const SalaryTableSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    SRO: {
        type: String,
        required: true,
    },
    sROId: {
        type: Date,
        required: true,
    },
    SRC: {
        type: Date,
        required: true,
    },
    sRCId: {
        type: String,
        required: true,
    },
    AdminUsers: {
        type: String,
        required: true,
    },
    adminUsersId: {
        type: String,
        required: true,
    },
    Administractor: {
        type: String,
        required: true,
    },
    administractorId: {
        type: String,
        required: true,
    },
    Accountant: {
        type: String,
        required: true,
    },
    accountantId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    Particular: {
        type: String,
        required: true,
    },
    particularId: {
        type: String,
        required: true,
    },
    Branch: {
        type: String,
        required: true,
    },
    branchId: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('salarytable', SalaryTableSchema)

