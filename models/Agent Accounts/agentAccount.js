const mongoose = require('mongoose')

const AgentAccountSchema = new mongoose.Schema({
    debit: {
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
    particularId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Particular",
    },
    registrationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegistrationTable",
    },
    status: {
        type:Boolean
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('AgentAccount', AgentAccountSchema)

