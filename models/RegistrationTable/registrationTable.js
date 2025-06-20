const mongoose = require('mongoose')

const RegistrationTableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent"
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolManagement",
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    sROId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    sRCId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    phone: {
        type: String,
        required: true,
    },
    cancel: {
        type: Boolean
    },
    address: {
        type: String,
        required: true,
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollegeManagement",
        required: true
    },
    course: {
        type: String,
        required: true,
    },
    total_fee: {
        type: Number,
    },
    recived_amount: {
        type: Number,
    },
    service_charge: {
        type: Number,
    },
    recived_service_charge: {
        type: Number,
    },
    status: {
        type: String,
        required: true,
    },
    certificates: {
        type: String,
        required: true,
    },
    request_status: {
        type: String,
        required: true,
    },
    booking_amount: {
        type: Number,
        required: true,
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    },
    comment: {
        type: String,
    },
    commission: {
        type: Number,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('RegistrationTable', RegistrationTableSchema)

