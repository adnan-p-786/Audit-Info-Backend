const mongoose = require('mongoose')

const AgentAccountSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    amount_type: {
        type: String,
        required: true,
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
        required: true
    },
    registrationTableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registrationTable",
        required: true
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('AgentAccount', AgentAccountSchema)

