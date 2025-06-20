const express = require('express')
const RegistrationTableModel = require ('../../models/RegistrationTable/registrationTable')
const router = express.Router()


router.post('/create',async(req,res)=>{
    try {
        const {name,agentId,schoolId,date,sROId,sRCId,phone,cancel,address,collegeId,course,total_fee,recived_amount,service_charge,recived_service_charge,status,certificates,request_status,booking_amount,branchId,comment,commission}= req.body
        if (!name ||!agentId ||!schoolId ||!date ||!sROId ||!sRCId ||!phone ||!cancel ||!address ||!collegeId ||!course ||!total_fee ||!recived_amount ||!service_charge ||!recived_service_charge ||!status ||!certificates ||!request_status ||!booking_amount ||!branchId ||!comment ||!commission)
            return res.status(400).json({message: "all fields are required"})
        const newData = await RegistrationTableModel.create({name,agentId,schoolId,date,sROId,sRCId,phone,cancel,address,collegeId,course,total_fee,recived_amount,service_charge,recived_service_charge,status,certificates,request_status,booking_amount,branchId,comment,commission})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await RegistrationTableModel.find()
        .populate('schoolId')
        .populate('sROId')
        .populate('sRCId')
        .populate('collegeId')
        .populate('branchId')
        .populate('agentId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await RegistrationTableModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await RegistrationTableModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Registration not found" });
        }
        res.status(200).json({ message: "Registration deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router