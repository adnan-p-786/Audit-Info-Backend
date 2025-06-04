const express = require('express')
const expenseModel = require ('../../models/Expense/expense')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,amount,comment,Particular,particularId,date,Branch,branchId}= req.body
        if (!createdAt || !updatedAt ||!amount ||!comment ||!Particular ||!particularId ||!date ||!Branch ||!branchId)
            return res.status(400).json({message: "all fields are required"})
        const newData = await expenseModel.create({createdAt,updatedAt,amount,comment,Particular,particularId,date,Branch,branchId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await expenseModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await expenseModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await expenseModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Particulars not found" });
        }
        res.status(200).json({ message: "Particulars deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router