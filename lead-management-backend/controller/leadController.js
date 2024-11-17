const LeadModel = require("../model/Lead")
const leadCreate = async (req, res) => {
  try {
    const { leadName,
      contactNumber,
      email,
      address,
      status,
      assignedTo,
      nextFollowUpDate,
      nextFollowUpTime,
      leadSource,
      conversionDate,
      leadNotes,
      customerType,
      purchaseHistory,
      medicalNeeds } = req.body;

    const leadEmail = await LeadModel.findOne({ email })
    if (leadEmail) {
      res.status(400).json({
        message: "Email Already exists",
        status: 0,
      })
    }

    const Leaduser = new LeadModel({
      leadName,
      contactNumber,
      email,
      address,
      status,
      assignedTo,
      nextFollowUpDate,
      nextFollowUpTime,
      leadSource,
      conversionDate,
      leadNotes,
      customerType,
      purchaseHistory,
      medicalNeeds
    })
    await Leaduser.save()
    res.status(200).json({
      message: "Successfully add",
      status: 1
    })
  } catch (error) {
    console.log("=================================error", error)
    res.status(500).json({
      message: "something went wrong",
      status: 0
    })
  }
}

const leadFetch = async (req, res) => {
  try {
    const leadFetch = await LeadModel.find();
    res.status(200).json({
      message: "Successfully Fetch",
      status: 1,
      leadFetch
    })
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      status: 0
    })
  }
}


const leadUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedLead = await LeadModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true } 
    );

    if (!updatedLead) {
      return res.status(404).json({
        message: "Lead not found",
        status: 0,
      });
    }

    res.status(200).json({
      message: "Successfully updated",
      status: 1,
      updatedLead,
    });
  } catch (error) {
    console.log("===<",error)
    res.status(500).json({
      message: "Something went wrong",
      status: 0,
    });
  }
};

const leadDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLead = await LeadModel.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({
        message: "Lead not found",
        status: 0,
      });
    }

    res.status(200).json({
      message: "Successfully deleted",
      status: 1,
      deletedLead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      status: 0,
    });
  }
};



module.exports = {
  leadCreate,
  leadFetch,
  leadDelete,
  leadUpdate,
}