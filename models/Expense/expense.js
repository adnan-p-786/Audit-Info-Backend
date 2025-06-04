const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    Particular: {
        type: String,
        required: true,
    },
    particularId: {
        type: Date,
        required: true,
    },
    date: {
        type: Date,
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

module.exports = mongoose.model('expense', ExpenseSchema)

