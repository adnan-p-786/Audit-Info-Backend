const mongoose = require('mongoose')

const AccountsSchema = new mongoose.Schema({
    debit: {
        type: Number,
        required: true,
    },
    credit: {
        type: Number,
        required: true,
    },
    type: {
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
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('account', AccountsSchema)

