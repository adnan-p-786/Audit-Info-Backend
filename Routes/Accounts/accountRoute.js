const express = require('express')
const AccountsModel = require('../../models/Accounts/accounts')
const router = express.Router()
const RecievedAmountModel = require('../../models/Recieved Amount/recivedAmount')
const RegistrationtableModel = require('../../models/RegistrationTable/registrationTable')


router.post('/create/:id', async (req, res) => {
    try {
        const { amount_type, recieved_amount } = req.body;

        if (!amount_type || recieved_amount == null || isNaN(recieved_amount)) {
            return res.status(400).json({ message: "All fields are required and amount must be a number" });
        }

        const newAccount = await AccountsModel.create({ amount_type, recieved_amount });

        const newRecievedAmount = await RecievedAmountModel.create({
            amount: recieved_amount,
            amount_type
        });

        const updatedRegistration = await RegistrationtableModel.findByIdAndUpdate(
            req.params.id,
            { status: "foradmmission" },
            { new: true }
        );
        res.status(201).json({
            account: newAccount,
            recievedAmount: newRecievedAmount,
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




router.post('/booking/:id', async (req, res) => {
    try {
        const { debit, amount_type, particularId } = req.body
        if (!debit || !amount_type || !particularId)
            return res.status(400).json({ message: "all fields are required" })
        const newData = await AccountsModel.create({ debit, amount_type, particularId })

        const updatedRegistration = await RegistrationtableModel.findByIdAndUpdate(
            req.params.id,
            {status: "forbookingconfirmation"},
            { booking_amount: debit }
        );

        if (!updatedRegistration) {
            return res.status(404).json({ message: "Booking record not found" });
        }

        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await AccountsModel.find()
            .populate('branchId')
            .populate('particularId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await AccountsModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteData = await AccountsModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.status(200).json({ message: "Account deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router