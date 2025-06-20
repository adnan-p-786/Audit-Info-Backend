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
        required: true,
    },
    status: {
        type: String,
    },
    delete: {
        type: Boolean,
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
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolManagement",
        required: true
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});


module.exports = mongoose.model('Lead', LeadSchema)

