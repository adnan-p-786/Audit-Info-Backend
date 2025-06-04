const mongoose = require('mongoose')

const RegistrationTableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    SchoolManagement: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    SRO: {
        type: String,
        required: true,
    },
    sROId: {
        type: String,
        required: true,
    },
    SRC: {
        type: String,
        required: true,
    },
    sRCId: {
        type: String,
        required: true,
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
    CollegeManagement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collegeManagement",
        required: true
    },
    collegeId: {
        type: String,
        default: null,
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
     Branch: {
        type: String,
        required: true,
    },
     branchId: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('registrationTable', RegistrationTableSchema)

