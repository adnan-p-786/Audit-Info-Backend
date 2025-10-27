const express = require('express')
const userModel = require('../../models/Users/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()


router.post('/create', async (req, res) => {
    try {
        const { name, email, password, Role } = req.body

        if (!name || !email || !password || !Role) {
            return res.status(400).json({ message: "Name, Email, Password, and Role are required"})
        }

        if (!['SRC', 'SRO','Accountant','Administrator','Manager'].includes(Role)) {
            return res.status(400).json({ message: "Role must be either" })
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const newUser = await userModel.create({
            name,
            email,
            Password: hashedPassword,
            Role
        });

        const token = jwt.sign({ id: newUser._id, role: newUser.Role }, process.env.JWT_SECRET);

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: newUser._id,
                Name: newUser.name,
                Email: newUser.email,
                Role: newUser.Role
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
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


router.post('/login', async (req, res) => {
    try {
        const { Email, Password , Role } = req.body;

        if (!Email || !Password ||!Role) {
            return res.status(400).json({ message: "Email, Role and password are required" });
        }

        const user = await userModel.findOne({ Email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.Role }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            data: {
                token,
                id: user._id,
                Email: user.Email,
                Role: user.Role
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
