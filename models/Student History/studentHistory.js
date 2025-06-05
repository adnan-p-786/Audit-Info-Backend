const mongoose = require('mongoose')

const StudentHistorySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    visit_date: {
        type: Date,
        required: true,
    },
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
        required: true
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('StudentHistory', StudentHistorySchema)

