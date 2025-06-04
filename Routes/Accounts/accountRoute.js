const express = require('express')
const AccountsModel = require ('../../models/Accounts/accounts')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,debit,credit,type,Branch,branchId,date,Particular,particularId}= req.body
        if (!createdAt || !updatedAt ||!debit ||!credit ||!type ||!Branch ||!branchId ||!date ||!Particular ||!particularId)
            return res.status(400).json({message: "all fields are required"})
        const newData = await AccountsModel.create({createdAt,updatedAt,debit,credit,type,Branch,branchId,date,Particular,particularId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await AccountsModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await AccountsModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await AccountsModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.status(200).json({ message: "Account deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router