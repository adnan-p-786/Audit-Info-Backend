const express = require('express')
const LeadModel = require('../../models/lead/lead')
const LeadHistoryModel = require('../../models/lead/leadHistory')
const Registration = require("../../models/RegistrationTable/registrationTable");
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
    const data = await Registration.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "sROId",
          foreignField: "_id",
          as: "employee"
        }
      },
      { $unwind: "$employee" },

      {
        $lookup: {
          from: "collegemanagements",
          localField: "collegeId",
          foreignField: "_id",
          as: "college"
        }
      },
      { $unwind: { path: "$college", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "points",
          localField: "_id",
          foreignField: "registrationId",
          as: "points"
        }
      },

      {
        $project: {
          createdAt: 1,
          studentName: "$name",
          employeeName: "$employee.name",
          collegeName: "$college.college",
          points: { $sum: "$points.credit" } // sum credit as Points
        }
      },
      { $sort: { createdAt: -1 } }
    ]);

    res.json({ success: true, data });
  } catch (error) {
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