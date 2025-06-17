const express = require('express')
const particularModel = require ('../../models/Particulars/particulars')
const router = express.Router()


router.post('/create',async (req, res) => {
    try {
        if (req.body.name){
            const particular = new particularModel({
                name: req.body.name
            });
            const savedParticular = await particular.save();
            res.status(201).json(savedParticular);
        }
        else{
            return res.status(400).json("name must be required")
        }
        
    } catch (error) {
        res.status(400).json(error);
    }
});


router.get('/get', async (req, res) => {
    try {
        const data = await particularModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await particularModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await particularModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Particulars not found" });
        }
        res.status(200).json({ message: "Particulars deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router