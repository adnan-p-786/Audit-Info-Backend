const mongoose = require('mongoose')

const SroPointSchema = new mongoose.Schema({
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
    particular: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    sROId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    registrationTableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegistrationTable",
        required: true
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('SroPoint', SroPointSchema)

