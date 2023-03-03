const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchSchema = new Schema(
  {
    name: String, 
    address: {
      province: String,
    },
  },
  { collection: "branches" }
);

const branch = mongoose.model("Branch", branchSchema);

module.exports = branch;
