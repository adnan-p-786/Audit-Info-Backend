const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    position: { type: String },
    employee_code: { type: String, unique: true },
    phone_number: String,
    date_of_joining: Date,
    address: String,
    status: { type: Boolean, default: true },
    refresh: String,
    point_amount: Number,

    is_admin: { type: Boolean, default: false },
    head_administractor: { type: Boolean, default: false },

    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'branch'},
    managerPoint: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ManagerPoint' }],
    sroId: {
        type: String
    },
    srcId: {
        type: String
    },
    lead: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lead' }],
    registration: [{ type: mongoose.Schema.Types.ObjectId, ref: 'registrationTable' }],
    srcPoint: { 
        type:Number
    },
    sroPoint: { 
        type:Number
    },
    Salary: { 
        type: Number,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('User', UserSchema)

