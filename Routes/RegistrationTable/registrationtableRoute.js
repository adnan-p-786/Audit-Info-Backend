const express = require('express')
const RegistrationTableModel = require ('../../models/RegistrationTable/registrationTable')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,name,SchoolManagement,date,SRO,sROId,SRC,sRCId,phone,cancel,address,CollegeManagement,collegeId,course,total_fee,recived_amount,service_charge,recived_service_charge,status,certificates,request_status,booking_amount,Branch,branchId}= req.body
        if (!createdAt || !updatedAt ||!name ||!SchoolManagement ||!date ||!SRO ||!sROId ||!SRC ||!sRCId ||!phone ||!cancel ||!address ||!CollegeManagement ||!collegeId ||!course ||!total_fee ||!recived_amount ||!service_charge ||!recived_service_charge ||!status ||!certificates ||!request_status ||!booking_amount ||!Branch ||!branchId)
            return res.status(400).json({message: "all fields are required"})
        const newData = await RegistrationTableModel.create({createdAt,updatedAt,name,SchoolManagement,date,SRO,sROId,SRC,sRCId,phone,cancel,address,CollegeManagement,collegeId,course,total_fee,recived_amount,service_charge,recived_service_charge,status,certificates,request_status,booking_amount,Branch,branchId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await RegistrationTableModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
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