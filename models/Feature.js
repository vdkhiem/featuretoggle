const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeatureSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    default: false
  },
  projects: [
    {
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
      }
    }
  ],
  deleted: {
    type: Boolean,
    default: false
  },
  createdby: {
    type: String
  },
  createdate: {
    type: Date,
    default: Date.now
  },
  updatedby: {
    type: String
  },
  updateddate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("feature", FeatureSchema);
