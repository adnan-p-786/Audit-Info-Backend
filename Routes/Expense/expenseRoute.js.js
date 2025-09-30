const express = require('express')
const expenseModel = require ('../../models/Expense/expense')
const accountModel = require ('../../models/Accounts/accounts')
const router = express.Router()

router.post('/create',async(req,res)=>{
    try {
        const {amount,comment,particularId,branchId}= req.body
        if (!amount ||!comment ||!particularId||!branchId)
            return res.status(400).json({message: "all fields are required"})
        const newData = await expenseModel.create({amount,comment,particularId,branchId})

        const newAccount = await accountModel.create({
            debit: amount,
            type: "expense",
            particularId: particularId,
            branchId: branchId,
            expenseId: newData._id
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
        .populate('branchId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {

        const id = req.params.id; 

        // delete expense
        const deleteData = await expenseModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "expense not found" });
        }

        // delete related account(s)
        await accountModel.deleteOne({ expenseId: id });

        res.status(200).json({ 
            message: "expense and related account(s) deleted successfully", 
            deletedExpense: deleteData 
        });
    } catch (error) {
        res.status(400).json(error);
    }
});



// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id; 
//         const deleteData = await expenseModel.findByIdAndDelete(id);
//         if (!deleteData) {
//             return res.status(404).json({ message: "expense not found" });
//         }
//         res.status(200).json({ message: "expense deleted successfully", deletedexpense: deleteData });
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });



module.exports = router