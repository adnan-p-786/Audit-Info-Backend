const express = require('express')
const CollegeFeesModel = require ('../../models/CollegeFees/collegeFees.js')
const router = express.Router()


router.post('/create',async(req,res)=>{
    try {
        const {particularId,amount,amount_type,directPay}= req.body
        if (!particularId ||!amount ||!amount_type ||!directPay===undefined )
            return res.status(400).json({message: "all fields are required"})
        const newData = await CollegeFeesModel.create({particularId,amount,amount_type,directPay})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await CollegeFeesModel.find()
        .populate('particularId')
        .populate('registrationId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await CollegeFeesModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await CollegeFeesModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "CollegeFees not found" });
        }
        res.status(200).json({ message: "CollegeFees deleted successfully", deletedFees: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router