const express = require('express')
const ManagerPointModel = require ('../../models/Manager Point/managerpoint')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,debit,credit,type,Particular,date,AdminUsers,adminUsersId,RegistrationTable,registrationTableId}= req.body
        if (!createdAt || !updatedAt ||!debit ||!credit ||!type ||!Particular ||!date ||!AdminUsers ||!adminUsersId ||!RegistrationTable ||!registrationTableId)
            return res.status(400).json({message: "all fields are required"})
        const newData = await ManagerPointModel.create({createdAt,updatedAt,debit,credit,type,Particular,date,AdminUsers,adminUsersId,RegistrationTable,registrationTableId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await ManagerPointModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await ManagerPointModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await ManagerPointModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "ManagerPoint not found" });
        }
        res.status(200).json({ message: "ManagerPoint deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router