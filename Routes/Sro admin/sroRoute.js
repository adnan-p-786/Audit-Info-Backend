const express = require('express')
const SroModel = require('../../models/Users/Users')
const RegistrationTable = require('../../models/RegistrationTable/registrationTable')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()


router.post('/create', async (req, res) => {
    try {
        const { name, email, password,phone_number,address,point_amount,status,employee_code,srcId,branchId} = req.body

        if (!name || !email || !password ||!phone_number || !address ||!point_amount || !status || !employee_code ||!srcId || !branchId) {
            return res.status(400).json({ message: "All fields are required"})
        }
        const existingUser = await SroModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newsro = await SroModel.create({
            name,
            email,
            password: hashedPassword,
            position:"SRO",
            employee_code,
            status,
            phone_number,
            address,
            point_amount,
            srcId,
            branchId
        });

        const token = jwt.sign({ id: newsro._id }, process.env.JWT_SECRET);

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: newsro._id,
                Name: newsro.name,
                Email: newsro.email,
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.get('/get', async (req, res) => {
    try {
        const Src = await SroModel.find({position: "SRO" })
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
        const updateData = await SroModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await SroModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Sro not found" });
        }
        res.status(200).json({ message: "Sro deleted successfully", deletedSro: deleteData });
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

        const sro = await SroModel.findOne({ email });

        if (!sro) {
            return res.status(404).json({ success: false, message: "sro does not exist" });
        }

        const isMatch = await bcrypt.compare(password, sro.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "mismatch" });
        }

        const token = jwt.sign({ id: sro._id }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            data: {
                token,
                id: sro._id,
                Email: sro.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/leaderboard/sro', async (req, res) => {
  try {
    const sroList = await SroModel.find({ position: 'SRO' });

    const registrationCounts = await RegistrationTable.aggregate([
      {
        $group: {
          _id: '$sROId',
          registrationCount: { $sum: 1 }
        }
      }
    ]);

    const leaderboard = sroList.map(sro => {
      const info = registrationCounts.find(
        count => String(count._id) === String(sro._id)
      );

      return {
        userId: sro._id,
        name: sro.name,
        registrationCount: info ? info.registrationCount : 0
      };
    });

    leaderboard.sort((a, b) => b.registrationCount - a.registrationCount);

    res.status(200).json(leaderboard);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
