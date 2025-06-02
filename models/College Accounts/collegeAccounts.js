const mongoose = require('mongoose')

const CollegeAccountsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    CollegeManagement: {
        type: String,
        required: true,
    },
    collegeId: {
        type: String,
        required: true,
    },
    debit: {
        type: Number,
        required: true,
    },
    credit: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('collegeAccount', CollegeAccountsSchema)

