const express = require('express')
const AcknowledgementModel = require ('../../models/Aknowledgement/aknowledgement')
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


router.post('/post', uploadImg.single("image"),async(req,res)=>{
    try {
        const image_url = `http://localhost:3000/api/aknowledgement/upload/images/${req.file.filename}`;
        const {createdAt,updatedAt,registrationTableId}= req.body

        if (!createdAt || !updatedAt ||!registrationTableId)
            return res.status(400).json({message: "all fields are required"})

        const newData = await AcknowledgementModel.create({createdAt: createdAt, updatedAt: updatedAt, registrationTableId: registrationTableId, image: image_url})
        res.status(201).json(newData)
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


router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await AcknowledgementModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await AcknowledgementModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Acknowledgement not found" });
        }
        res.status(200).json({ message: "Acknowledgement deleted successfully", deletedAccountant: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router