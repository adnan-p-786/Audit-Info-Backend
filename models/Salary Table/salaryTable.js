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
    sROId: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sRCId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    adminUsersId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    administractorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    accountantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('Salarytable', SalaryTableSchema)

