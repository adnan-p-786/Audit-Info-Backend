const express = require('express')
const AccountantModel = require ('../../models/Accountant/accountant')
const router = express.Router()


router.post('/post',async(req,res)=>{
    try {
        const {createdAt,updatedAt,name,email,password,position,employee_code,status,phone_number,date_of_joining,address,refresh,SalaryTable}= req.body
        if (!createdAt || !updatedAt ||!name ||!email ||!password ||!position ||!employee_code ||!status ||!phone_number ||!date_of_joining ||!address ||!refresh ||!SalaryTable)
            return res.status(400).json({message: "all fields are required"})
        const newData = await AccountantModel.create({createdAt,updatedAt,name,email,password,position,employee_code,status,phone_number,date_of_joining,address,refresh,SalaryTable})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await AccountantModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await AccountantModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await AccountantModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Accountant not found" });
        }
        res.status(200).json({ message: "Accountant deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router