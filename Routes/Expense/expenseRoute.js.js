const express = require('express')
const expenseModel = require ('../../models/Expense/expense')
const accountModel = require ('../../models/Accounts/accounts')
const router = express.Router()


router.post('/create',async(req,res)=>{
    try {
        const {amount,comment,particularId}= req.body
        if (!amount ||!comment ||!particularId)
            return res.status(400).json({message: "all fields are required"})
        const newData = await expenseModel.create({amount,comment,particularId})

        
        const newAccount = await accountModel.create({
            debit: amount,
            type: "expense",
            particularId: particularId
        })

         res.status(201).json({
            expense: newData,
            account: newAccount
        })
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await expenseModel.find()
        .populate('particularId')
        // .populate('branchId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id; 

    // Delete expense
    const deleteData = await expenseModel.findByIdAndDelete(id);
    if (!deleteData) {
      return res.status(404).json({ message: "expense not found" });
    }

    // Delete related account (using particularId)
    await accountModel.deleteMany({particularId: new mongoose.Types.ObjectId(deleteData.particularId)});

    res.status(200).json({ 
      message: "expense & account deleted successfully", 
      deletedExpense: deleteData 
    });
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(400).json({ error: error.message });
  }
});


// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id; 
//         const deleteData = await expenseModel.findByIdAndDelete(id);
//         if (!deleteData) {
//             return res.status(404).json({ message: "expense not found" });
//         }
//         res.status(200).json({ message: "expense deleted successfully", deletedAccountant: deleteData });
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });



module.exports = router