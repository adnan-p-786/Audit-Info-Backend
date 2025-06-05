const mongoose = require('mongoose')

const SendAmountSchema = new mongoose.Schema({
    registrationTableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegistrationTable",
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    particularId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Particular",
        required: true
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollegeManagement",
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('SendAmount', SendAmountSchema)

