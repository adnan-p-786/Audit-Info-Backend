const mongoose = require('mongoose')

const ParticularSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('particulars', ParticularSchema)

