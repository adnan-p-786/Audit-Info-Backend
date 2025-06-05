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
    branchId: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    particularId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Particular",
        required: true
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('Account', AccountsSchema)

