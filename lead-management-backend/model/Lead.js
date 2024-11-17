const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  leadName: { type: String, required: true },
  contactNumber: { type: String },
  email: { type: String },
  address: { type: String },
  status: { type: String, enum: ["new", 'New', 'In Progress', 'Converted',"in progress", "converted", "closed"], default: "new" },
  assignedTo: { type: String },
  nextFollowUpDate: { type: Date },
  nextFollowUpTime: { type: String },
  leadSource: { type: String },
  conversionDate: { type: Date },
  leadNotes: { type: String },
  customerType: { type: String, enum: ["new","New", "existing"], default: "new" },
  purchaseHistory: { type: Array },
  medicalNeeds: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);
