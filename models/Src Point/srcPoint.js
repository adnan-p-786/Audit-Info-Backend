const mongoose = require('mongoose')

const SrcPointSchema = new mongoose.Schema({
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
        required: true,
    },
    SRC: {
        type: String,
        required: true,
    },
    sRCId: {
        type: String,
        required: true,
    },
    RegistrationTable: {
        type: String,
        required: true,
    },
    registrationTableId: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('srcpoint', SrcPointSchema)

