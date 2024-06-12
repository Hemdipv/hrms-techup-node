const db = require("../models");

// create main model
const Department = db.department;

const getAllDepartments = async (req, res) => {
  try {
    let departments = await Department.findAll();
    res.status(200).send({
      flag: true,
      outdata: { departments: departments },
      totalRecord: departments?.length,
    });
    return;
  } catch (err) {
    res.status(501).send(err);
    return;
  }
};

const addDepartment = async (req, res) => {
  try {
    const { departmentName } = req.body;

    // Check if the department already exists
    const existingDepartment = await Department.findOne({ where: { profileName: departmentName } });
    if (existingDepartment) {
      return res.status(400).send({
        flag: false,
        message: "Department already exists",
      });
    }

    // If the department doesn't exist, create it
    const department = await Department.create({ profileName: departmentName });
    res.status(200).send({
      flag: true,
      message: "Department added successfully",
      outdata: { department },
    });
  } catch (error) {
    return res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error,
    });
  }
};


const getOneDepartment = async (req, res) => {
  let id = req.params.id;
  try {
    let department = await Department.findOne({ where: { departmentId: id } });
    // let outdata = {
    //     user,
    //     roleNmae: role.roleName
    // }
    res.status(200).send({
      flag: true,
      outdata: { department },
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

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentName } = req.body;
    const roleSkill = await Department.update(
      { profileName: departmentName },
      {
        where: { departmentId: id },
      }
    );
    res.status(200).send({
      flag: true,
      message: "Department updated successfully",
      roleSkill,
    });
  } catch (error) {
    res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error,
    });
  }
};

const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    await Department.destroy({
      where: {
        departmentId: id,
      },
    });
    res.status(200).send({
      flag: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error,
    });
  }
};

module.exports = {
  getAllDepartments,
  addDepartment,
  getOneDepartment,
  updateDepartment,
  deleteDepartment
};
