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
    particularId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Particular",
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('Expense', ExpenseSchema)

