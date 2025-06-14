const express = require('express')
const LeadModel = require ('../../models/lead/lead')
const router = express.Router()


router.post('/create',async(req,res)=>{
    try {
        const {name,phone_number,date_of_joining,status,delete:del,address,mark,subject_name,course,sRCId,sROId,branchId,schoolId}= req.body
        if (!name ||!phone_number ||!date_of_joining ||!status ||!del ||!mark ||!subject_name ||!course ||!address ||!sRCId  ||!sROId  ||!branchId ||!schoolId)
            res.status(400).json({message: "all fields are required"})
        const newData = await LeadModel.create({name,phone_number,date_of_joining,status,delete:del,address,mark,subject_name,course,sRCId,sROId,branchId,schoolId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await LeadModel.find()
        .populate('branchId')
        .populate('schoolId')
        .populate('sRCId')
        .populate('sROId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await LeadModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await LeadModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Lead not found" });
        }
        res.status(200).json({ message: "Lead deleted successfully", deletedLead: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router