const express = require('express')
const BranchModel = require ('../../models/Branch/branch')
const router = express.Router()


router.post('/create',async(req,res)=>{
    try {
        const {name,code,status}= req.body
        if (!name ||!code ||!status)
            res.status(400).json({message: "all fields are required"})
        const newData = await BranchModel.create({name,code,status})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await BranchModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await BranchModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await BranchModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "branch not found" });
        }
        res.status(200).json({ message: "branch deleted successfully", deletedLead: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router