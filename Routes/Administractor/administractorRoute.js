const express = require('express')
const AdministractorModel = require('../../models/Users/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()


router.post('/create', async (req, res) => {
    try {
        const { name, email, password,employee_code,phone_number,date_of_joining,address,head_administractor,branchId } = req.body

        if (!name || !email || !password ||!employee_code  || !phone_number || !date_of_joining || !address || !head_administractor ||!branchId) {
            return res.status(400).json({ message: "All fields are required"})
        }
        const existingUser = await AdministractorModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdministractor = await AdministractorModel.create({
            name,
            email,
            password: hashedPassword,
            position:"Administractor",
            employee_code,
            phone_number,
            date_of_joining,
            address,
            head_administractor,
            branchId,
        });

        const token = jwt.sign({ id: newAdministractor._id }, process.env.JWT_SECRET);

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: newAdministractor._id,
                Name: newAdministractor.name,
                Email: newAdministractor.email,
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.get('/get', async (req, res) => {
    try {
        const administractor = await AdministractorModel.find()
        .populate('branchId')
        res.status(200).json(administractor);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await AdministractorModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await AdministractorModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Administractor not found" });
        }
        res.status(200).json({ message: "Administractor deleted successfully", deletedLead: deleteData });
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

        const administractor = await AdministractorModel.findOne({ email });

        if (!administractor) {
            return res.status(404).json({ success: false, message: "Administractor does not exist" });
        }

        const isMatch = await bcrypt.compare(password, administractor.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "mismatch" });
        }

        const token = jwt.sign({ id: administractor._id }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            data: {
                token,
                id: administractor._id,
                Email: administractor.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
