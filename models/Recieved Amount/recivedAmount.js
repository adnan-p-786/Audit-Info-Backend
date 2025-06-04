const mongoose = require('mongoose')

const RecievedAmountSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    amount_type: {
        type: String,
        required: true,
    },
    collected: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
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

module.exports = mongoose.model('recievedAmount', RecievedAmountSchema)

