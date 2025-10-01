const mongoose = require('mongoose')

const CollegeAccountsSchema = new mongoose.Schema({
    type: {
        type: String,
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollegeManagement",
    },
    debit: {
        type: Number,
    },
    credit: {
        type: Number,
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('CollegeAccount', CollegeAccountsSchema)

