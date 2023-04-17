const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BannerModel = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  image_name: {
    type: String,
  },
});

module.exports = mongoose.model("Banner", BannerModel);
