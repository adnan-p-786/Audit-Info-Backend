const express = require('express')
const AccountsModel = require('../../models/Accounts/accounts')
const router = express.Router()
const RecievedAmountModel = require('../../models/Recieved Amount/recivedAmount')
const RegistrationtableModel = require('../../models/RegistrationTable/registrationTable')
const particularModel = require('../../models/Particulars/particulars')


router.post('/servicecharge/:id', async (req, res) => {
    try {
        const { credit, amount_type } = req.body;
        const registrationId = req.params.id
        if (!credit || !amount_type) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // const newAccount = await AccountsModel.create({ amount_type, credit, registrationId });

        const updatedRegistration = await RegistrationtableModel.findByIdAndUpdate(
            req.params.id,
            { status: "forServicecollection", recived_amount: credit , amount_type: amount_type },
            { new: true }
        );

        res.status(201).json();



    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/addamount/:id', async (req, res) => {
    try {
        const { credit, amount_type } = req.body;

        if (!amount_type || !credit) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedRegistration = await RegistrationtableModel.findByIdAndUpdate(
            req.params.id,
            { status: "foramountcollection", recived_amount: credit, amount_type: amount_type },
            { new: true }
        );

        res.status(201).json();



    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});



router.get('/get-servicecharge/:id', async (req, res) => {
    try {
        const registerId = RegistrationtableModel.find().select('_id');
        // console.log({registerId});
        const particularId = await particularModel.findOne({ name: "Service Charge" }).select('_id');
        // console.log({particularId});
        
        const data = await AccountsModel.find({ registerId: req.params.id, particularId:particularId._id })
            .populate('registrationId')
            .populate('particularId')
            console.log({data});

       return res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});



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

router.post('/collect-Payment/:id', async (req, res) => {
    try {
        let particular;
        const registered = await RegistrationtableModel.findById(req.params.id);
        if (!registered) {
            return res.status(404).json({ message: "Registration record not found" });
        } else if (registered.status == "foramountcollection") {
            particular = await particularModel.findOne({ name: "Add Amount" });

        } else if (registered.status == "forServicecollection") {
            particular = await particularModel.findOne({ name: "Service Charge" });
        }

        const updatedRegistration = await RegistrationtableModel.findByIdAndUpdate(
            req.params.id,
            { status: "collectedPayment" },
            { new: true }
        );


        if (!particular) {
            return res.status(404).json({ message: "Particular 'Add Amount' not found" });
        }

        const newAccount = await AccountsModel.create({
            credit: registered.recived_amount,
            amount_type: registered.amount_type,
            particular: particular._id,
            registerId: req.params.id
        });

        res.status(201).json({
            message: "Amount added successfully and linked with particular",
            account: newAccount,
            particular
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});



router.put('/confirm/:id', async (req, res) => {
    try {
        const bookingconfirmation = await RegistrationtableModel.findByIdAndUpdate(
            req.params.id,
            { status: "foracknowledgment" },
            { new: true }
        );

        if (!bookingconfirmation) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.status(200).json({ message: "Booking confirmed successfully", bookingconfirmation });
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
            { status: "forbookingconfirmation" },
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