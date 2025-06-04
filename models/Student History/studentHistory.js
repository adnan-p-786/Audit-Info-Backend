const mongoose = require('mongoose')

const StudentHistorySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
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
    Lead: {
        type: String,
        required: true,
    },
    leadId: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('studentHistory', StudentHistorySchema)

