const mongoose = require('mongoose')

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mark: {
        type: Number,
        required: true,
    },
    subject_name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
    sRCId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false

    },
    sROId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false

    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolManagement",
        required: true
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});


module.exports = mongoose.model('Lead', LeadSchema)

