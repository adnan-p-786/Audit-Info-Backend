const express = require('express')
const SrcPointModel = require ('../../models/Src Point/srcPoint')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,debit,credit,type,Particular,date,SRC,sRCId,RegistrationTable,registrationTableId}= req.body
        if (!createdAt || !updatedAt ||!debit ||!credit ||!type ||!Particular ||!date ||!SRC ||!sRCId ||!RegistrationTable ||!registrationTableId)
            return res.status(400).json({message: "all fields are required"})
        const newData = await SrcPointModel.create({createdAt,updatedAt,debit,credit,type,Particular,date,AdminUsers,adminUsersId,RegistrationTable,registrationTableId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await SrcPointModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await SrcPointModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await SrcPointModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "SrcPoint not found" });
        }
        res.status(200).json({ message: "SrcPoint deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router