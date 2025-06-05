const mongoose = require('mongoose')

const AcknowledgementSchema = new mongoose.Schema({
    registrationTableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registrationTable",
        required: true
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('Aknowledgement', AcknowledgementSchema)