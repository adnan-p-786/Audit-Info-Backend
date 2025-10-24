const express = require('express')
const AgentAccountModel = require ('../../models/Agent Accounts/agentAccount')
const router = express.Router()


router.post('/create',async(req,res)=>{
    try {
        const {debit,amount_type,agentId,registrationId,particularId}= req.body
        if (!debit ||!amount_type ||!agentId ||!registrationId ||!particularId)
            res.status(400).json({message: "all fields are required"})
        const newData = await AgentAccountModel.create({debit,amount_type,agentId,registrationId,particularId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await AgentAccountModel.find()
        .populate('agentId')
        .populate('registrationId')
        .populate('particularId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await AgentAccountModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await AgentAccountModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Agent Account not found" });
        }
        res.status(200).json({ message: "Agent Account deleted successfully", deletedLead: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router