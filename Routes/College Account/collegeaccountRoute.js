const express = require('express')
const CollegeAccountModel = require ('../../models/College Accounts/collegeAccounts')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,type,CollegeManagement,collegeId,debit,credit,date}= req.body
        if (!createdAt || !updatedAt ||!type ||!CollegeManagement ||!collegeId ||!debit ||!credit ||!date )
            return res.status(400).json({message: "all fields are required"})
        const newData = await CollegeAccountModel.create({createdAt,updatedAt,type,CollegeManagement,collegeId,debit,credit,date})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await CollegeAccountModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await CollegeAccountModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await CollegeAccountModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "CollegeAccount not found" });
        }
        res.status(200).json({ message: "CollegeAccount deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router