const db = require("../models");

// create main model
const Role = db.role;
// const Role = db.role

//2. get all skills
const getAllRoles = async (req, res) => {
  try {
    let roles = await Role.findAll();

    res.status(200).send({
      flag: true,
      outdata: { roles },
      totalRecord: roles?.length,
    });
    return;
  } catch (err) {
    res.status(501).send(err);
    return;
  }
};

//3. get one skill
const getOneRole = async (req, res) => {
  let id = req.params.id;
  try {
    let role = await Role.findOne({ where: { roleId: id } });
    // let outdata = {
    //     user,
    //     roleNmae: role.roleName
    // }
    res.status(200).send({
      flag: true,
      outdata: { role },
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

const addRole = async (req, res) => {
  try {
    const { roleName } = req.body;

    // Check if the role already exists
    const existingRole = await Role.findOne({ where: { roleName } });
    if (existingRole) {
      return res.status(400).send({
        flag: false,
        message: "Role already exists",
      });
    }

    // If the role doesn't exist, create it
    const role = await Role.create({ roleName });
    res.status(200).send({
      flag: true,
      message: "Role added successfully",
      outdata: { role },
    });
  } catch (error) {
    return res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error,
    });
  }
};


const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleName } = req.body;

    const roleSkill = await Role.update(
      { roleName: roleName },
      {
        where: { roleId: id },
      }
    );
    res.status(200).send({
      flag: true,
      message: "Role updated successfully",
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

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    //   const { roleName } = req.body;
    await Role.destroy({
      where: {
        roleId: id,
      },
    });

    res.status(200).send({
      flag: true,
      message: "Role deleted successfully",
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

module.exports = {
  // addUser,
  getAllRoles,
  getOneRole,
  addRole,
  updateRole,
  deleteRole,
};
