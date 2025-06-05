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
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true
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
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});


module.exports = mongoose.model('CollegeManagement', CollegeManagementSchema)

