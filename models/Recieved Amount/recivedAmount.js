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
    registrationTableId: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "RegistrationTable",
        required: true
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('RecievedAmount', RecievedAmountSchema)

