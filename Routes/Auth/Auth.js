const express = require('express')
const userModel = require('../../models/Users/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()


// router.post('/create', async (req, res) => {
//     try {
//         const { name, email, password,employee_code,phone_number,date_of_joining,address,point_amount,salary } = req.body

//         if (!name || !email || !password ||!employee_code  || !phone_number || !date_of_joining || !address || !point_amount ||!salary) {
//             return res.status(400).json({ message: "All fields are required"})
//         }
//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "Email already in use" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newManager = await ManagerModel.create({
//             name,
//             email,
//             password: hashedPassword,
//             position,
//             employee_code,
//             phone_number,
//             date_of_joining,
//             address,
//             refresh,
//             point_amount,
//             salary
//         });

//         const token = jwt.sign({ id: newManager._id, role: newManager.Role }, process.env.JWT_SECRET);

//         return res.status(201).json({
//             success: true,
//             token,
//             user: {
//                 id: newManager._id,
//                 Name: newManager.name,
//                 Email: newManager.email,
//             }
//         });

//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "user does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "mismatch" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            data: {
                token,
                id: user._id,
                Email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});



router.get('/get', async (req, res) => {
    try {
        const managers = await ManagerModel.find();
        res.status(200).json(managers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
