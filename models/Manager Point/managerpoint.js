const mongoose = require('mongoose')

const ManagerPointSchema = new mongoose.Schema({
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
    AdminUsers: {
        type: String,
        required: true,
    },
    adminUsersId: {
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

module.exports = mongoose.model('ManagerPoint', ManagerPointSchema)

