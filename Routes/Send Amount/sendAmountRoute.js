const express = require('express')
const SendAmountModel = require ('../../models/Send Amount/sendAmount')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,RegistrationTable,registrationTableId,amount,Particular,particularId,Branch,branchId,CollegeManagement,collegeId,date}= req.body
        if (!createdAt || !updatedAt ||!RegistrationTable ||!registrationTableId ||!amount ||!Particular ||!particularId ||!Branch ||!branchId ||!CollegeManagement ||!collegeId ||!date)
            return res.status(400).json({message: "all fields are required"})
        const newData = await SendAmountModel.create({createdAt,updatedAt,RegistrationTable,registrationTableId,amount,Particular,particularId,Branch,branchId,CollegeManagement,collegeId,date})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await SendAmountModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await SendAmountModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await SendAmountModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "SendAmount not found" });
        }
        res.status(200).json({ message: "SendAmount deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router