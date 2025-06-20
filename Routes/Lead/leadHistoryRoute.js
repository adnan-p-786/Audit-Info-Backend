const express = require('express')
const LeadHistoryModel = require ('../../models/lead/leadHistory')
const router = express.Router()


router.post('/create',async(req,res)=>{
    try {
        const {status,message,leadId}= req.body
        if (!status ||!message ||!leadId)
            res.status(400).json({message: "all fields are required"})
        const newData = await LeadHistoryModel.create({status,message,leadId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await LeadHistoryModel.find()
        .populate('leadId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await LeadHistoryModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await LeadHistoryModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Lead History not found" });
        }
        res.status(200).json({ message: "Lead History deleted successfully", deletedLead: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router