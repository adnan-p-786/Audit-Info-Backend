const express = require('express')
const ManagerModel = require('../../models/Manager/manager')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()


router.post('/create', async (req, res) => {
    try {
        const { name, email, password,employee_code,phone_number,date_of_joining,address,point_amount,salary,branchId } = req.body

        if (!name || !email || !password ||!employee_code  || !phone_number || !date_of_joining || !address || !point_amount ||!salary || !branchId) {
            return res.status(400).json({ message: "All fields are required"})
        }
        const existingUser = await ManagerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newManager = await ManagerModel.create({
            name,
            email,
            password: hashedPassword,
            position:"Manager",
            employee_code,
            phone_number,
            date_of_joining,
            address,
            point_amount,
            salary
        });

        const token = jwt.sign({ id: newManager._id }, process.env.JWT_SECRET);

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: newManager._id,
                Name: newManager.name,
                Email: newManager.email,
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.get('/get', async (req, res) => {
    try {
        const managers = await ManagerModel.find()
        .populate('branchId'); 
        res.status(200).json(managers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await ManagerModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await ManagerModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Manager not found" });
        }
        res.status(200).json({ message: "Manager deleted successfully", deletedLead: deleteData });
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

        const Manager = await ManagerModel.findOne({ email });

        if (!Manager) {
            return res.status(404).json({ success: false, message: "Manager does not exist" });
        }

        const isMatch = await bcrypt.compare(password, Manager.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "mismatch" });
        }

        const token = jwt.sign({ id: Manager._id }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            data: {
                token,
                id: Manager._id,
                Email: Manager.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
