const mongoose = require('mongoose')

const CollegeFeesSchema = new mongoose.Schema({
    particularId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Particular",
    },
    registrationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegistrationTable",
    },
    amount: {
        type: Number,
    },
    amount_type: {
        type: String,
    },
    directPay: {
        type: Boolean,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('CollegeFees', CollegeFeesSchema)

