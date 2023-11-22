const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  hours: {
    type: String,
  },
  room: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
});

module.exports = mongoose.model("Department", DepartmentSchema);
