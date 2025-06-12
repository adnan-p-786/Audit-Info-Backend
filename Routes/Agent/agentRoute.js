const express = require('express')
const AgentModel = require ('../../models/Agent/agent')
const router = express.Router()


router.post('/create',async(req,res)=>{
    try {
        const {name,email,phone_number,address}= req.body
        if (!name ||!email ||!phone_number ||!address)
            res.status(400).json({message: "all fields are required"})
        const newData = await AgentModel.create({name,email,phone_number,address})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await AgentModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await AgentModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await AgentModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Agent not found" });
        }
        res.status(200).json({ message: "Agent deleted successfully", deletedLead: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router