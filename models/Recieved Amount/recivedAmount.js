const mongoose = require('mongoose')

const RecievedAmountSchema = new mongoose.Schema({
    amount: {
        type: Number,
    },
    amount_type: {
        type: String,
    },
    collected: {
        type: Boolean,
    },
    date: {
        type: Date,
    },
    registrationTableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegistrationTable"
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('RecievedAmount', RecievedAmountSchema)

