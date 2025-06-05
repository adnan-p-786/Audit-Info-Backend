const mongoose = require('mongoose')

const RegistrationTableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
        ref: "User",
        required: true
    },
    sRCId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    cancel: {
        type: Boolean,
        required: true,
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
        required: true,
    },
    recived_amount: {
        type: Number,
        required: true,
    },
    service_charge: {
        type: Number,
        required: true,
    },
    recived_service_charge: {
        type: Number,
        required: true,
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
        required: true
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('RegistrationTable', RegistrationTableSchema)

