const express = require('express')
const AgentAccountModel = require('../../models/Agent Accounts/agentAccount');
const accounts = require('../../models/Accounts/accounts');
const particularModel = require('../../models/Particulars/particulars');
const router = express.Router()


router.post('/create', async (req, res) => {
    try {
        const { amount, type, amount_type, agentId, registrationId, particularId } = req.body
        if (!amount || !type || !amount_type || !agentId || !registrationId || !particularId)
            res.status(400).json({ message: "all fields are required" })
        const newData = await AgentAccountModel.create({ amount, amount_type, agentId, registrationId, particularId, type, status: "foragentpayments" })
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
});


router.post('/confirmagentpymnt/:id', async (req, res) => {
    try {
        const { credit, amount_type } = req.body;

        if (!amount_type || !credit) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const particularId = await particularModel.findOne({ name: "Commission" }).select('_id');

        if (!particularId) {
            return res.status(404).json({ message: "Commission particular not found" });
        }

        const data = await accounts.create({ credit, amount_type,particularId});

        res.status(201).json({ data });

        const updatedAgentAccount = await AgentAccountModel.findByIdAndUpdate(
            req.params.id,
            { status: "none" },
            { new: true }
        );

        res.status(201).json();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.get('/get', async (req, res) => {
    try {
        const data = await AgentAccountModel.find()
            .populate('agentId')
            .populate('registrationId')
            .populate('particularId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await AgentAccountModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteData = await AgentAccountModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Agent Account not found" });
        }
        res.status(200).json({ message: "Agent Account deleted successfully", deletedLead: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router