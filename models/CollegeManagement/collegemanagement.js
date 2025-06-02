const mongoose = require('mongoose')

const CollegeManagementSchema = new mongoose.Schema({
    college: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    Branch: {
        type: String,
        required: true,
    },
    branchId: {
        type: Boolean,
        required: true,
    },
    bm_point: {
        type: Number,
        required: true,
    },
    src_point: {
        type: Number,
        required: true,
    },
    sro_point: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    registration: {
        type: String,
        required: true,
    },
     SendAmount: {
        type: String,
        required: true,
    },
     CollegeAccounts: {
        type: String,
        required: true,
    },
},{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
});


module.exports = mongoose.model('collegeManagement', CollegeManagementSchema)

