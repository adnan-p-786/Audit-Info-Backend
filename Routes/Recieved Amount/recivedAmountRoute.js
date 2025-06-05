const express = require('express')
const RecievedAmountModel = require ('../../models/Recieved Amount/recivedAmount')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,amount,amount_type,collected,date,registrationTableId}= req.body
        if (!createdAt || !updatedAt ||!amount ||!amount_type ||!collected ||!date ||!registrationTableId)
            return res.status(400).json({message: "all fields are required"})
        const newData = await RecievedAmountModel.create({createdAt,updatedAt,amount,amount_type,collected,date,registrationTableId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await RecievedAmountModel.find()
        .populate('registrationTableId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await RecievedAmountModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await RecievedAmountModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "recievedamount not found" });
        }
        res.status(200).json({ message: "recievedamount deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router