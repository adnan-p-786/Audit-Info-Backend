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
    studentHistory: {
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
    SRO: {
        type: String,
        required: true,
    },
    sROId: {
        type: String,
        required: true,
    },
     Branch: {
        type: String,
        required: true,
    },
     branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branch",
        required: true
    },
      SchoolManagement: {
        type: String,
        required: true,
    },
      schoolId: {
        type: String,
        required: true,
    },
},{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});


module.exports = mongoose.model('lead', LeadSchema)

