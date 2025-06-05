const express = require('express')
const SroPointModel = require ('../../models/Src Point/srcPoint')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,debit,credit,type,Particular,date,sROId,registrationTableId}= req.body
        if (!createdAt || !updatedAt ||!debit ||!credit ||!type ||!Particular ||!date ||!sROId ||!registrationTableId)
            return res.status(400).json({message: "all fields are required"})
        const newData = await SroPointModel.create({createdAt,updatedAt,debit,credit,type,Particular,date,sROId,registrationTableId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await SroPointModel.find()
        .populate('sROId')
        .populate('registrationTableId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await SroPointModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await SroPointModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "SrcPoint not found" });
        }
        res.status(200).json({ message: "SrcPoint deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router