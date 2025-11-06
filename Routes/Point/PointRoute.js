const express = require('express')
const PointModel = require ('../../models/Point/point')
const router = express.Router()

router.get('/get', async (req, res) => {
    try {
        const data = await PointModel.find()
        .populate(userId)
        .populate(registrationId)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router