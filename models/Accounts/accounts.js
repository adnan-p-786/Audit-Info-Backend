const mongoose = require('mongoose')

const AccountsSchema = new mongoose.Schema({
    debit: {
        type: Number,
    },
    credit: {
        type: Number,
    },
    type: {
        type: String,
    },
    recieved_amount: {
        type: Number,
    },
    amount_type: {
        type: String,
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch"
    },
    particularId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Particular"
    },
    registerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegistrationTable"
    },
    expenseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('Account', AccountsSchema)

