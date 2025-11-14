const express = require('express')
const userModel = require('../../models/Users/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()


router.post('/signup', async (req, res) => {
    try {
        const { name, position, email, password } = req.body;

        if (!name || !position || !email || !password) {
            return res.status(400).json({ message: "Name, Email, Password, and Position are required" });
        }

        const allowedPositions = ['SRC', 'SRO', 'Accountant', 'Administrator', 'Manager' , 'Admin'];
        if (!allowedPositions.includes(position)) {
            return res.status(400).json({ message: `Position must be one of: ${allowedPositions.join(', ')}` });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate unique employee code
        const lastUser = await userModel.findOne().sort({ createdAt: -1 });
        let employeeCode;
        if (lastUser && lastUser.employee_code) {
            const lastCode = parseInt(lastUser.employee_code.replace('EMP', ''));
            employeeCode = `EMP${(lastCode + 1).toString().padStart(4, '0')}`;
        } else {
            employeeCode = 'EMP0001';
        }

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            position,
            employee_code: employeeCode 
        });

        const token = jwt.sign(
            { id: newUser._id, role: newUser.position },
            process.env.JWT_SECRET
        );

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: newUser._id,
                Name: newUser.name,
                Email: newUser.email,
                Position: newUser.position,
                EmployeeCode: newUser.employee_code
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { email, password, position } = req.body;

        if (!email || !password || !position) {
            return res.status(400).json({ message: "Email, position and password are required" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        // Check position matches
        if (user.position !== position) {
            return res.status(401).json({ success: false, message: "Position mismatch" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.position },
            process.env.JWT_SECRET
        );

        return res.status(200).json({
            success: true,
            data: {
                token,
                id: user._id,
                Email: user.email,
                Position: user.position
            }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});



router.get('/get', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
