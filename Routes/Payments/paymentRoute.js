const express =  require('express')
const PaymentModal = require('../../models/Payments/payments')
const router = express.Router()


router.post('/create',async(req,res)=>{
    try {
        const {branchId,user_type,userId,particularId,amount,amount_type}= req.body
        if (!branchId ||!user_type ||!userId||!particularId||!amount ||!amount_type)
            res.status(400).json({message: "all fields are required"})
        const newData = await PaymentModal.create({branchId,user_type,particularId,amount,amount_type,userId})
        res.status(201).json(newData)
    } catch (error) {
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


// router.put('/update/:id', async (req, res) => {
//     try {
//         const id = req.params.id
//         const updateData = await PaymentModal.findOneAndUpdate({ _id: id }, req.body, { new: true })
//         res.status(200).json(updateData)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })


// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id; 
//         const deleteData = await PaymentModal.findByIdAndDelete(id);
//         if (!deleteData) {
//             return res.status(404).json({ message: "Particulars not found" });
//         }
//         res.status(200).json({ message: "Particulars deleted successfully", deletedAccountant: deleteData });
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });


module.exports = router