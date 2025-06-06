const express = require('express')
const SrcModel = require('../../models/Users/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()


router.post('/create', async (req, res) => {
    try {
        const { name, email, password,phone_number,date_of_joining,address,point_amount,status,employee_code,branchId} = req.body

        if (!name || !email || !password ||!phone_number || !date_of_joining || !address ||!point_amount || !status || !employee_code || !branchId) {
            return res.status(400).json({ message: "All fields are required"})
        }
        const existingUser = await SrcModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newsrc = await SrcModel.create({
            name,
            email,
            password: hashedPassword,
            position:"SRO",
            employee_code,
            status,
            phone_number,
            date_of_joining,
            address,
            point_amount,
            branchId
        });

        const token = jwt.sign({ id: newsrc._id }, process.env.JWT_SECRET);

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: newsrc._id,
                Name: newsrc.name,
                Email: newsrc.email,
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.get('/get', async (req, res) => {
    try {
        const Src = await SrcModel.find()
        res.status(200).json(Src);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await SrcModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await SrcModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Src not found" });
        }
        res.status(200).json({ message: "Src deleted successfully", deletedLead: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const src = await SrcModel.findOne({ email });

        if (!src) {
            return res.status(404).json({ success: false, message: "src does not exist" });
        }

        const isMatch = await bcrypt.compare(password, src.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "mismatch" });
        }

        const token = jwt.sign({ id: src._id }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            data: {
                token,
                id: src._id,
                Email: src.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
