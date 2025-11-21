const express = require('express')
const managerModel = require('../../models/Users/Users')
const RegistrationTable = require('../../models/RegistrationTable/registrationTable')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()


router.post('/create', async (req, res) => {
    try {
        const { name, email, password, phone_number, address, point_amount, employee_code, branchId, salary } = req.body

        if (!name || !email || !password || !phone_number || !address || !point_amount || !employee_code || !branchId || !salary) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const existingUser = await managerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newmanager = await managerModel.create({
            name,
            email,
            password: hashedPassword,
            position: "Manager",
            employee_code,
            salary,
            phone_number,
            address,
            point_amount,
            branchId
        });

        const token = jwt.sign({ id: newmanager._id }, process.env.JWT_SECRET);

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: newmanager._id,
                Name: newmanager.name,
                Email: newmanager.email,
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.get('/leaderboard/manager', async (req, res) => {
    try {
        const managers = await managerModel.find({ position: 'Manager' });
        console.log(managers);

        const registrationCounts = await RegistrationTable.aggregate([
            {
                $group: {
                    _id: '$branchId',
                    registrationCount: { $sum: 1 }
                }
            }
        ]);

        console.log(registrationCounts);

        const leaderboard = managers.map(m => {
            const branchInfo = registrationCounts.find(
                count => String(count._id) === String(m.branchId)
            );

            return {
                managerId: m._id,
                name: m.name,
                branchId: m.branchId,
                registrationCount: branchInfo ? branchInfo.registrationCount : 0
            };
        });

        leaderboard.sort((a, b) => b.registrationCount - a.registrationCount);

        res.status(200).json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

});




router.get('/get', async (req, res) => {
    try {
        const Src = await managerModel.find({ position: "Manager" })
            .populate('branchId')
            .populate('srcId')
        res.status(200).json(Src);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await managerModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteData = await managerModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Manager not found" });
        }
        res.status(200).json({ message: "Manager deleted successfully", deletedManager: deleteData });
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

        const manager = await managerModel.findOne({ email });

        if (!manager) {
            return res.status(404).json({ success: false, message: "sro does not exist" });
        }

        const isMatch = await bcrypt.compare(password, sro.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "mismatch" });
        }

        const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            data: {
                token,
                id: manager._id,
                Email: manager.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
