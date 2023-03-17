const TempyHume = require("../models/TempyHume")

const findAllData = async(req, res) => {
    const data = await TempyHume.find()
    res.send(data)
}

const findOneData = async(req, res) => {
    const data = await TempyHume.findById(req.params.id)
    res.send(data)
}

module.exports = {
    findAllData,
    findOneData
}