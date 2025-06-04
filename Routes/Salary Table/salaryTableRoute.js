const express = require('express')
const salaryTableModel = require ('../../models/Salary Table/salaryTable')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,amount,type,SRO,sROId,SRC,sRCId,AdminUsers,adminUsersId,Administractor,administractorId,Accountant,accountantId,date,Particular,particularId,Branch,branchId}= req.body
        if (!createdAt || !updatedAt ||!amount ||!type ||!SRO ||!sROId ||!SRC ||!sRCId ||!AdminUsers ||!adminUsersId ||!Administractor  ||!administractorId  ||!Accountant  ||!accountantId  ||!date ||!Particular ||!particularId ||!Branch ||!branchId)
            return res.status(400).json({message: "all fields are required"})
        const newData = await salaryTableModel.create({createdAt,updatedAt,amount,type,SRO,sROId,SRC,sRCId,AdminUsers,adminUsersId,Administractor,administractorId,Accountant,accountantId,date,Particular,particularId,Branch,branchId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await salaryTableModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await salaryTableModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await salaryTableModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Salary Table not found" });
        }
        res.status(200).json({ message: "Salary Table deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router