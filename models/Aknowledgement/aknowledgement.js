const mongoose = require('mongoose')

const AcknowledgementSchema = new mongoose.Schema({
    RegistrationTable: {
        type: String,
        required: true,
    },
    registrationTableId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('aknowledgement', AcknowledgementSchema)