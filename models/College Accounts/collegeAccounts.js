const mongoose = require('mongoose')

const CollegeAccountsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollegeManagement",
        required: true
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
        default: Date.now,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('CollegeAccount', CollegeAccountsSchema)

