const express = require('express')
const SchoolManagementModel = require ('../../models/School Management/schoolManagement')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,name,school_code,Branch,branchId,Lead,RegistrationTable}= req.body
        if (!createdAt || !updatedAt ||!name ||!school_code ||!Branch ||!branchId ||!Lead ||!RegistrationTable)
            return res.status(400).json({message: "all fields are required"})
        const newData = await SchoolManagementModel.create({createdAt,updatedAt,name,school_code,Branch,branchId,Lead,RegistrationTable})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await SchoolManagementModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await SchoolManagementModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await SchoolManagementModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Schoolmanagement not found" });
        }
        res.status(200).json({ message: "Schoolmanagement deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router