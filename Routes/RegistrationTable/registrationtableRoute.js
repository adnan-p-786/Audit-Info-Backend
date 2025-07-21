const express = require('express')
const RegistrationTableModel = require ('../../models/RegistrationTable/registrationTable')
const router = express.Router()


router.post('/create-service',async(req,res)=>{
    try {
        const {service_charge}= req.body
        if (!service_charge)
            return res.status(400).json({message: "service charge required"})
        const newData = await RegistrationTableModel.create({service_charge})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/create',async(req,res)=>{
    try {
        const {name,schoolId,phone_number,address,collegeId,course,total_fee,recived_amount,certificates,comment,commission}= req.body
        if (!name ||!schoolId ||!phone_number ||!address ||!collegeId ||!course ||!total_fee ||!recived_amount ||!certificates ||!comment ||!commission)
            return res.status(400).json({message: "all fields are required"})
        const newData = await RegistrationTableModel.create({name,schoolId,phone_number,address,collegeId,course,total_fee,recived_amount,certificates,comment,commission,status:"registered"})
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