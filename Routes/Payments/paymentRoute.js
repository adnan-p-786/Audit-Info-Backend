const express =  require('express')
const PaymentModal = require('../../models/Payments/payments')
const point = require('../../models/Point/point')
const Particular = require('../../models/Particulars/particulars')
const router = express.Router()

router.post('/create', async (req, res) => {
  try {
    const { branchId, user_type, userId, particularId, amount, amount_type } = req.body
    
    if (!branchId || !user_type || !userId || !particularId || !amount || !amount_type){
      return res.status(400).json({message: "all fields are required"})
    }

    // ✅ 1. Find the particular document by ObjectId
    const particular = await Particular.findById(particularId)
    if (!particular) {
      return res.status(404).json({ message: "Invalid particularId" })
    }

    // ✅ 2. Create payment entry
    const newPayment = await PaymentModal.create({
      branchId,
      user_type,
      particularId,
      amount,
      amount_type,
      userId
    })

    // ✅ 3. If the particular is Commission → create a new debit entry
    if (particular.name === "Commission") {

      // Find last credit entry for this user
      const lastRecord = await point.findOne({ userId }).sort({ createdAt: -1 })
      if (!lastRecord) {
        return res.status(400).json({ message: "No previous credit record found for this user" })
      }

      // Calculate: debit = amount / credit
      const creditValue = Number(lastRecord.credit)
      const debitValue = Number(amount) / creditValue

      // ✅ 4. Create NEW debit point entry (do NOT update old record)
      await point.create({
        userId,
        registrationId,
        debit: debitValue,
        credit: 0,
        type: "debit",
        particular: "Commission"
      })
    }

    res.status(201).json({
      message: "Payment created & debit point created successfully",
      data: newPayment
    })

  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})




router.get('/get', async (req, res) => {
    try {
        const data = await PaymentModal.find()
        .populate('branchId')
        .populate('particularId')
        .populate('userId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router