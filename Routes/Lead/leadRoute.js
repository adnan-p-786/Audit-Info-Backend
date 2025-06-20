const express = require('express')
const LeadModel = require ('../../models/lead/lead')
const LeadHistoryModel = require ('../../models/lead/leadHistory')
const router = express.Router()


router.post('/create',async(req,res)=>{
    try {
        const {name,phone_number,date_of_joining,status,delete:del,address,mark,subject_name,course,sRCId,sROId,branchId,schoolId}= req.body
        if (!name ||!phone_number ||!date_of_joining ||!status ||!del==null ||!mark ||!subject_name ||!course ||!address ||!sRCId  ||!sROId  ||!branchId ||!schoolId)
            res.status(400).json({message: "all fields are required"})
        const newData = await LeadModel.create({name,phone_number,date_of_joining,status,delete:del,address,mark,subject_name,course,sRCId,sROId,branchId,schoolId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
  try {
    // Fetch all leads
    const leads = await LeadModel.find()
      .populate('sRCId')
      .populate('sROId')
      .populate('branchId')
      .populate('schoolId')

    // Fetch all histories in one query
    const leadIds = leads.map(lead => lead._id);
    const histories = await LeadHistoryModel.find({ leadId: { $in: leadIds } });

    // Map leadId -> histories[]
    const historyMap = histories.reduce((acc, history) => {
      const id = history.leadId.toString();
      if (!acc[id]) acc[id] = [];
      acc[id].push(history);
      return acc;
    }, {});

    // Add histories to each lead
    const leadsWithHistories = leads.map(lead => {
      return {
        ...lead.toObject(),
        histories: historyMap[lead._id.toString()] || [],
      };
    });

    res.status(200).json(leadsWithHistories);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
});


// router.get('/get', async (req, res) => {
//     try {
//         const data = await LeadModel.find()
//         .populate('branchId')
//         .populate('schoolId')
//         .populate('sRCId')
//         .populate('sROId')
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });


router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await LeadModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await LeadModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Lead not found" });
        }
        res.status(200).json({ message: "Lead deleted successfully", deletedLead: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router