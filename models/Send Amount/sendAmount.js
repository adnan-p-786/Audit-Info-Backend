const mongoose = require('mongoose')

const SendAmountSchema = new mongoose.Schema({
    RegistrationTable: {
        type: String,
        required: true,
    },
    registrationTableId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
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
    CollegeManagement: {
        type: String,
        required: true,
    },
    collegeId: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('sendAmount', SendAmountSchema)

