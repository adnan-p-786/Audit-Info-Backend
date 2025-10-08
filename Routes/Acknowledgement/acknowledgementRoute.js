const express = require('express')
const AcknowledgementModel = require('../../models/Aknowledgement/aknowledgement')
const RegistrationtableModel = require('../../models/RegistrationTable/registrationTable')

const router = express.Router()
const multer = require('multer')
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const uploadImg = multer({ storage: storage });


router.get("/upload/images/:imageName", (req, res) => {
    const imageName = req.params.imageName;

    const imagesFolder = path.join(__dirname, "../upload", "images");

    const imagePath = path.join(imagesFolder, imageName);

    res.sendFile(imagePath);

})


router.post('/create/:id', uploadImg.single("image"), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const image_url = `http://localhost:3000/api/aknowledgement/upload/images/${req.file.filename}`;
        const newData = await AcknowledgementModel.create({ image: image_url,registrationTableId:req.params.id })
        res.status(201).json(newData)

        const updatedRegistration = await RegistrationtableModel.findByIdAndUpdate(
            req.params.id,
            { status: "none" }
        );

        if (!updatedRegistration) {
            return res.status(404).json({ message: "Booking record not found" });
        }

    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await AcknowledgementModel.find()
            .populate('registrationTableId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});



// router.put('/put/:id', async (req, res) => {
//     try {
//         const id = req.params.id
//         const updateData = await AcknowledgementModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
//         res.status(200).json(updateData)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })


// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const deleteData = await AcknowledgementModel.findByIdAndDelete(id);
//         if (!deleteData) {
//             return res.status(404).json({ message: "Acknowledgement not found" });
//         }
//         res.status(200).json({ message: "Acknowledgement deleted successfully", deletedAccountant: deleteData });
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });

module.exports = router