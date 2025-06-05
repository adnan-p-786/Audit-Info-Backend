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
    date_of_joining: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
    },
    delete: {
        type: Boolean,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mark: {
        type: String,
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
    sRCId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sROId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    SchoolManagement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolManagement",
        required: true
    },
    schoolId: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});


module.exports = mongoose.model('Lead', LeadSchema)

