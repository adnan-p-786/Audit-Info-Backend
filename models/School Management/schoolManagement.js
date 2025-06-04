const mongoose = require('mongoose')

const SchoolManagementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    school_code: {
        type: String,
        required: true,
    },
    Branch: {
        type: Date,
        required: true,
    },
    branchId: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('schoolManagement', SchoolManagementSchema)

