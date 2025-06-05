const express = require('express')
const CollegeManagementModel = require ('../../models/CollegeManagement/collegemanagement')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,college,city,state,category,branchId,bm_point,src_point,sro_point,status}= req.body
        if (!createdAt || !updatedAt ||!college ||!city ||!state ||!category ||!branchId ||!bm_point ||!src_point ||!sro_point ||!status)
            return res.status(400).json({message: "all fields are required"})
        const newData = await CollegeManagementModel.create({createdAt,updatedAt,college,city,state,category,branchId,bm_point,src_point,sro_point,status})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await CollegeManagementModel.find()
        .populate('branchId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await CollegeManagementModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await CollegeManagementModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "CollegeManagement not found" });
        }
        res.status(200).json({ message: "CollegeManagement deleted successfully", deletedCollegeManagement: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router