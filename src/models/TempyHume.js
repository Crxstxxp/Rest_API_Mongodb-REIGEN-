const mongoose = require("mongoose");

const TempyHumeSchema = new mongoose.Schema({
  sensors: [
    {
      temperature: {
        type: Number,
      },
      humidity: {
        type: Number,
      },
      moisture: {
        type: Number
      }
    },
  ],
});

module.exports = mongoose.model("TempyHume", TempyHumeSchema);
