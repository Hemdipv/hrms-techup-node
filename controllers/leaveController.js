const db = require("../models");
const sendEmail = require("../Utills/emailService");

// Create main models
const Leave = db.leave;
const Staff = db.staff;

const addLeave = async (req, res) => {
  try {
    const { staffId, start_date, end_date, subject, leave_body, approve_by } = req.body;

    const staff = await Staff.findOne({ where: { staffId: staffId } });
    console.log("staffstaffstaff", staff)
    // Create a new leave request without validation
    const leave = await Leave.create({
      staffId,
      start_date,
      end_date,
      subject,
      leave_body,
      approve_by:staff.reportingPerson
    });

    console.log("const staff", staff)

    sendEmail({
        subject: "New Leave Request Added",
        html: `<div>
        <p>Dear Sir & Ma'am,</p>

Today I want to take a leave because <b>${leave_body}</b>. I shall be reachable at my email id <b>${staff.email}</b> and phone number <b>${staff.mobile}</b>. Besides, I have instructed to another developer to take care of certain responsibilities during my absence. He is well equipped for any emergency or in case any assistance is required.<br><br>

I request you to please grant my leave for <b>${start_date}  -  ${end_date}</b>. Also, let me know if any further clarifications are required for the case.  
<br><br><br>
Yours Sincerely,<br>
<b>${staff.name}</b>
</div>`,
        to: process.env.FROM_EMAIL,
        from: process.env.EMAIL,
      });

    res.status(200).send({
      flag: true,
      message: "Leave request added successfully",
      outdata: { leave },
    });
  } catch (error) {
    console.error("Error adding leave request:", error); // Log the actual error

    return res.status(500).send({
      flag: false,
      message: "An error occurred while processing your request",
      error: error.message, // Send the error message in the response
    });
  }
};

const getAllLeaves = async (req, res) => {
  try {
    // Fetch all leave requests
    let leaves = await Leave.findAll();
    
    // Map over leaves and fetch the staff name for each leave request
    let arr = await Promise.all(leaves.map(async (data) => {
      let staff = await Staff.findOne({ where: { staffId: data.staffId } }) || {};
      return {
        ...data.dataValues,
        candidateName: staff.name
      };
    }));

    // Send the response
    res.status(200).send({
      flag: true,
      outdata: { arr },
      totalRecord: arr.length,
    });
  } catch (err) {
    console.error("Error fetching leave requests:", err);
    res.status(501).send({
      flag: false,
      message: "An error occurred while processing your request",
      error: err.message,
    });
  }
};

const getOneLeaveDetails = async (req, res) => {
  let id = req.params.id;
  try {
    let candidate = await Leave.findOne({ where: { id: id } });
   
    res.status(200).send({
      flag: true,
      outdata: {
        candidate
      },
    });
    return;
  } catch (error) {
    res.status(500).send({
      flag: false,
      message: "something went wrong!",
      error,
    });
    return;
  }
};

// New function to update leave request
const updateLeave = async (req, res) => {
  let id = req.params.id;
  try {
    const { staffId, start_date, end_date, subject, leave_body, approve_by } = req.body;

    // Find the leave request by id
    let leave = await Leave.findOne({ where: { id: id } });
    if (!leave) {
      return res.status(404).send({
        flag: false,
        message: "Leave request not found",
      });
    }

    // Update the leave request
    leave.staffId = staffId;
    leave.start_date = start_date;
    leave.end_date = end_date;
    leave.subject = subject;
    leave.leave_body = leave_body;
    leave.approve_by = approve_by;

    await leave.save();

    res.status(200).send({
      flag: true,
      message: "Leave request updated successfully",
      outdata: { leave },
    });
  } catch (error) {
    console.error("Error updating leave request:", error); // Log the actual error

    return res.status(500).send({
      flag: false,
      message: "An error occurred while processing your request",
      error: error.message, // Send the error message in the response
    });
  }
};

// New function to delete leave request
const deleteLeave = async (req, res) => {
    let id = req.params.id;
    try {
      // Find the leave request by id
      let leave = await Leave.findOne({ where: { id: id } });
      if (!leave) {
        return res.status(404).send({
          flag: false,
          message: "Leave request not found",
        });
      }
  
      // Delete the leave request
      await leave.destroy();
  
      res.status(200).send({
        flag: true,
        message: "Leave request deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting leave request:", error); // Log the actual error
  
      return res.status(500).send({
        flag: false,
        message: "An error occurred while processing your request",
        error: error.message, // Send the error message in the response
      });
    }
  };

  const updateLeaveStatus = async (req, res) => {
    try {
      const { leaveId, action } = req.body; // action should be 'approve', 'reject', or 'pending'
  
      // Validate action
      const validActions = ['approve', 'reject', 'pending'];
      if (!validActions.includes(action)) {
        return res.status(400).send({
          flag: false,
          message: 'Invalid action. Valid actions are approve, reject, or pending.',
        });
      }
  
      // Map action to status
      const statusMap = {
        approve: 'approved',
        reject: 'rejected',
        pending: 'pending'
      };
  
      const status = statusMap[action];
  
      // Find the leave request
      const leave = await Leave.findOne({ where: { id: leaveId } });
  
      if (!leave) {
        return res.status(404).send({
          flag: false,
          message: 'Leave request not found',
        });
      }
  
      // Update the status
      leave.status = status;
      await leave.save();
  
      // Send notification email
      const staff = await Staff.findOne({ where: { staffId: leave.staffId } });
  
      sendEmail({
        subject: `Leave Request ${status}`,
        html: `<div>
          <p>Dear ${staff.name},</p>
          <p>Your leave request for <b>${leave.start_date} - ${leave.end_date}</b> has been <b>${status}</b>.</p>
          <br><br>
          Regards,<br>
          Management Team
        </div>`,
        to: staff.email,
        from: process.env.EMAIL,
      });
  
      res.status(200).send({
        flag: true,
        message: `Leave request ${status} successfully`,
        outdata: { leave },
      });
    } catch (error) {
      console.error("Error updating leave status:", error); // Log the actual error
  
      return res.status(500).send({
        flag: false,
        message: "An error occurred while processing your request",
        error: error.message, // Send the error message in the response
      });
    }
  };
  
  

module.exports = {
  addLeave,
  getAllLeaves,
  getOneLeaveDetails,
  updateLeave,
  deleteLeave,
  updateLeaveStatus
};
