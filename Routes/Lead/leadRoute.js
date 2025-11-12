const express = require('express')
const LeadModel = require('../../models/lead/lead')
const LeadHistoryModel = require('../../models/lead/leadHistory')
const Registration = require("../../models/RegistrationTable/registrationTable");
const Lead = require("../../models/lead/lead");
const Point = require("../../models/Point/point");
const router = express.Router()
const xlsx = require('xlsx');
const mongoose = require('mongoose');


router.post('/create', async (req, res) => {
  try {
    const { name, phone_number, address, mark, subject_name, course, sRCId, sROId, branchId, schoolId, comment } = req.body;

    if (!name || !phone_number || !mark || !subject_name || !course || !address || !branchId || !schoolId ||!sRCId || !sROId || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newLead = await LeadModel.create({
      name, phone_number, comment, address,
      mark, subject_name, course, branchId, schoolId, sRCId, sROId,status: 'Not Registered'
    });

    res.status(201).json(newLead);

  } catch (error) {
    res.status(400).json({ message: "Creation failed", error });
  }
});

// router.post("/uploadEXCEL", async (c) => {
//   try {
//     const formData = await c.req.formData();
//     const file = formData.get("file");
//     const buffer = Buffer.from(await file.arrayBuffer());

//     const xlfile = xlsx.read(buffer);
//     let xldata = [];

//     const sheets = xlfile.SheetNames;

//     for (let i = 0; i < sheets.length; i++) {
//       const temp = xlsx.utils.sheet_to_json(xlfile.Sheets[sheets[i]]);
//       temp.forEach((res) => {
//         // Optional: Transform input if necessary
//         // For example: Convert date strings to Date objects, etc.
//         xldata.push({
//           name: res.name,
//           phone_number: res.phone_number,
//           date_of_joining: new Date(res.date_of_joining),
//           status: res.status || 'pending',
//           delete: res.delete === 'true' || res.delete === true, // ensure Boolean
//           address: res.address,
//           mark: Number(res.mark),
//           subject_name: res.subject_name,
//           course: res.course,
//           sRCId: res.sRCId ? new mongoose.Types.ObjectId(res.sRCId) : undefined,
//           sROId: res.sROId ? new mongoose.Types.ObjectId(res.sROId) : undefined,
//           branchId: new mongoose.Types.ObjectId(res.branchId),
//           schoolId: new mongoose.Types.ObjectId(res.schoolId),
//         });
//       });
//     }

//     const result = await Lead.insertMany(xldata);

//     return c.json({ success: true, inserted: result.length, data: result });
//   } catch (error) {
//     console.error(error);
//     return c.json({ error: error.message }, 400);
//   }
// });



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


router.get("/employee-sales", async (req, res) => {
  try {
    // Fetch leads (because you have both leads + registrations)
    const leads = await Lead.find()
      .populate("sROId", "name")
      .populate("sRCId", "name")
      .populate("branchId", "branch_name")
      .populate("schoolId", "school_name");

    // Fetch registrations
    const registrations = await Registration.find()
      .populate("sROId", "name")
      .populate("sRCId", "name")
      .populate("collegeId", "college"); // Populate college info

    // Fetch points for registration-related credits
    const points = await Point.find();

    // Build table data
    const data = [];

    // 1️⃣ Include all leads - create entries for both SRO and SRC
    leads.forEach((lead) => {
      const relatedPoints = points.filter(
        (p) =>
          p.particular?.includes(lead.name) || // sometimes point refers to lead name
          p.registrationId?.toString() === lead._id.toString()
      );

      const totalPoints = relatedPoints.reduce(
        (acc, p) => acc + (p.credit || 0) - (p.debit || 0),
        0
      );

      // Add SRO entry if exists
      if (lead.sROId) {
        data.push({
          _id: `${lead._id}_sro`,
          date: lead.createdAt,
          employee_name: lead.sROId.name,
          student_name: lead.name || "N/A",
          college: "-", // ✅ Changed to match dataIndex
          points: totalPoints,
        });
      }

      // Add SRC entry if exists
      if (lead.sRCId) {
        data.push({
          _id: `${lead._id}_src`,
          date: lead.createdAt,
          employee_name: lead.sRCId.name,
          student_name: lead.name || "N/A",
          college: "-", // ✅ Changed to match dataIndex
          points: totalPoints,
        });
      }
    });

    // 2️⃣ Include all registrations - create entries for both SRO and SRC
    registrations.forEach((reg) => {
      const regPoints = points.filter(
        (p) => p.registrationId?.toString() === reg._id.toString()
      );

      const totalPoints = regPoints.reduce(
        (acc, p) => acc + (p.credit || 0) - (p.debit || 0),
        0
      );

      // Extract college name
      const collegeName = reg.collegeId?.college || "N/A";

      // Add SRO entry if exists
      if (reg.sROId) {
        data.push({
          _id: `${reg._id}_sro`,
          date: reg.createdAt,
          employee_name: reg.sROId.name,
          student_name: reg.name || "N/A",
          college: collegeName, // ✅ Changed to match dataIndex
          collegeId: reg.collegeId?.college || null, // Keep the ID if you need it for filtering/actions
          points: totalPoints,
        });
      }

      // Add SRC entry if exists
      if (reg.sRCId) {
        data.push({
          _id: `${reg._id}_src`,
          date: reg.createdAt,
          employee_name: reg.sRCId.name,
          student_name: reg.name || "N/A",
          college: collegeName, // ✅ Changed to match dataIndex
          collegeId: reg.collegeId?.college || null, // Keep the ID if you need it for filtering/actions
          points: totalPoints,
        });
      }
    });

    // Sort newest first
    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error in /employee-sales:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

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