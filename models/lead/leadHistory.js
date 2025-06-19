const mongoose = require('mongoose')

const LeadHistorySchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
        required: true
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('LeadHistory', LeadHistorySchema)

