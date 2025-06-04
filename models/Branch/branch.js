const mongoose = require('mongoose')

const BranchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});


module.exports = mongoose.model('branch', BranchSchema)

