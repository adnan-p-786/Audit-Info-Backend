const mongoose = require('mongoose')

const SchoolManagementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    school_code: {
        type: String,
        required: true,
        unique: true,
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('SchoolManagement', SchoolManagementSchema)

