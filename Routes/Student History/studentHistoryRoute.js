const express = require('express')
const StudentHistoryModel = require ('../../models/Student History/studentHistory')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,date,message,status,visit_date,Lead,leadId}= req.body
        if (!createdAt || !updatedAt ||!date ||!message ||!status ||!visit_date ||!Lead ||!leadId)
            return res.status(400).json({message: "all fields are required"})
        const newData = await StudentHistoryModel.create({createdAt,updatedAt,date,message,status,visit_date,Lead,leadId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await StudentHistoryModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await StudentHistoryModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await StudentHistoryModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "studentHistory not found" });
        }
        res.status(200).json({ message: "studentHistory deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router