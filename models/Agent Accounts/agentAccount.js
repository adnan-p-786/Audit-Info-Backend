const mongoose = require('mongoose')

const AgentAccountSchema = new mongoose.Schema({
    amount: {
        type: String,
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
    particularId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Particular",
        required: true
    },
    registrationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegistrationTable",
        required: true
    },
    status: {
        type:String
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('AgentAccount', AgentAccountSchema)

