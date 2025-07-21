const mongoose = require('mongoose')

const RegistrationTableSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent"
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolManagement",
    },
    date: {
        type: Date,
    },
    sROId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    sRCId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    phone_number: {
        type: String,
    },
    cancel: {
        type: Boolean
    },
    address: {
        type: String,
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollegeManagement",
    },
    course: {
        type: String,
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
    },
    certificates: {
        type: [String], 
    },
    request_status: {
        type: String,
    },
    booking_amount: {
        type: Number,
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

