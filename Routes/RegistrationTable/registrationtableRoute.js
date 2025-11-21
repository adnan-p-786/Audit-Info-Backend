const express = require('express')
const RegistrationTableModel = require('../../models/RegistrationTable/registrationTable')
const collegeAccounts = require('../../models/College Accounts/collegeAccounts')
const particularModel = require('../../models/Particulars/particulars')
const AccountsModel = require('../../models/Accounts/accounts')
const PointModel = require('../../models/Point/point')
const ManagerModel = require('../../models/Users/Users')
const LeadModel = require('../../models/lead/lead')
const router = express.Router()


router.post('/create-service/:id', async (req, res) => {
    try {
        const { service_charge } = req.body
        if (!service_charge)
            return res.status(400).json({ message: "service charge required" })

        const updateData = await RegistrationTableModel.findByIdAndUpdate(
            req.params.id,
            { status: "forbooking" },
            { service_charge },
            { new: true }
        )

        const collegeaccount = await collegeAccounts.create({
            credit: service_charge,
            collegeId: updateData.collegeId,
            registrationId: req.params.id
        })

        res.status(201).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.post('/refund/:id', async (req, res) => {
    try {
        const { refundamount } = req.body;
        const registrationId = req.params.id;

        if (!registrationId) {
            return res.status(400).json({ message: "registrationId is required" });
        }
        // console.log(registrationId);

        if (!refundamount) {
            return res.status(400).json({ message: "amount required" });
        }

        const particular = await particularModel.findOne({ name: "Refund" });
        if (!particular) {
            return res.status(404).json({ message: "Refund particular not found" });
        }

        const newAccount = await AccountsModel.create({
            debit: refundamount,
            registrationId: registrationId,
            particularId: particular._id,

        });

        const updatedRegistration = await RegistrationTableModel.findByIdAndUpdate(
            registrationId,
            {
                status: "ForRefund",
                refundamount: refundamount
            },
            { new: true }
        );

        if (!updatedRegistration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        res.status(201).json({
            message: "Refund successfully",
            account: newAccount,
            registration: updatedRegistration,
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/updateregister/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { cancel } = req.body;

        if (!id) {
            return res.status(400).json({ message: "registrationId is required" });
        }

        const updatedData = await RegistrationTableModel.findByIdAndUpdate(
            id,
            { cancel: true },
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({
            message: 'Student updated successfully',
            data: updatedData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update student', error: error.message });
    }
});



router.post('/create', async (req, res) => {
    try {
        const { name, schoolId, phone_number, address, collegeId, course, total_fee, recived_amount, certificates, comment, commission, booking_amount, agentId } = req.body
        if (!name || !schoolId || !phone_number || !address || !collegeId || !course || !total_fee || !recived_amount || !certificates || !comment || !commission || !booking_amount || !agentId)
            return res.status(400).json({ message: "all fields are required" })
        const newData = await RegistrationTableModel.create({ name, schoolId, phone_number, address, collegeId, course, total_fee, recived_amount, certificates, comment, commission, booking_amount, agentId, status: "registered" })
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})



router.post('/register/:id', async (req, res) => {
    try {
        const {
            name, schoolId, phone_number, address, collegeId, course,
            total_fee, recived_amount, certificates, comment, commission,
            booking_amount, agentId
        } = req.body;

        if (!name || !schoolId || !phone_number || !address || !collegeId ||
            !course || !total_fee || !recived_amount || !certificates ||
            !comment || !commission || !booking_amount || !agentId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Fetch Lead
        const leadId = req.params.id;
        const lead = await LeadModel.findById(leadId)
            .populate('sRCId')
            .populate('sROId')
            .populate('branchId');

        if (!lead) return res.status(404).json({ message: 'Lead not found' });

        // Use lead.branchId
        const branchId = lead.branchId;

        // Create registration with AUTO branchId
        const newData = await RegistrationTableModel.create({
            name, schoolId, phone_number, address, collegeId, course,
            total_fee, recived_amount, certificates, comment, commission,
            booking_amount, agentId,
            branchId: branchId,  
            status: "registered"
        });

        // Update lead status
        await LeadModel.findByIdAndUpdate(
            leadId,
            { status: "Registered" },
            { new: true }
        );

        // Awarding points (same as before)
        await newData.populate('collegeId');
        const college = newData.collegeId;

        const pointEntries = [];
        const manager = await ManagerModel.findOne({ branchId, position: 'Manager' });

        if (manager) {
            pointEntries.push({
                debit: 0,
                credit: college.bm_point,
                type: 'credit',
                particular: `Lead (${name}) registered under branch ${branchId._id}`,
                userId: manager._id,
                registrationId: newData._id
            });
        }

        if (lead.sRCId) {
            pointEntries.push({
                debit: 0,
                credit: college.src_point,
                type: 'credit',
                particular: `Lead (${name}) registered by SRC ${lead.sRCId.name}`,
                userId: lead.sRCId._id,
                registrationId: newData._id
            });
        }

        if (lead.sROId) {
            pointEntries.push({
                debit: 0,
                credit: college.sro_point,
                type: 'credit',
                particular: `Lead (${name}) registered by SRO ${lead.sROId.name}`,
                userId: lead.sROId._id,
                registrationId: newData._id
            });
        }

        if (pointEntries.length > 0) {
            await PointModel.insertMany(pointEntries);
        }

        res.status(201).json({
            message: 'Registration created and lead updated successfully',
            registration: newData,
            lead
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});






router.get('/get', async (req, res) => {
    try {
        const data = await RegistrationTableModel.find()
            .populate('schoolId')
            .populate('sROId')
            .populate('sRCId')
            .populate('collegeId')
            .populate('branchId')
            .populate('agentId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await RegistrationTableModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteData = await RegistrationTableModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Registration not found" });
        }
        res.status(200).json({ message: "Registration deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router