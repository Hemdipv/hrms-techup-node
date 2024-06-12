const db = require("../models");

// create main model
const Skill = db.skill;
// const Role = db.role

//2. get all skills
const getAllSkills = async (req, res) => {
  try {
    let skills = await Skill.findAll();
    res.status(200).send({
      flag: true,
      outdata: { skills },
      totalRecord: skills?.length,
    });
    return;
  } catch (err) {
    res.status(501).send(err);
    return;
  }
};

//3. get one skill
const getOneSkill = async (req, res) => {
  let id = req.params.id;
  try {
    let skill = await Skill.findOne({ where: { skillId: id } });
    // let outdata = {
    //     user,
    //     roleNmae: role.roleName
    // }
    res.status(200).send({
      flag: true,
      outdata: { skill },
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

const createSkill = async (req, res) => {
  try {
    const { technology } = req.body;
    
    // Check if the skill already exists
    const existingSkill = await Skill.findOne({ where: { technology } });
    if (existingSkill) {
      return res.status(400).send({
        flag: false,
        message: "Skill already exists",
      });
    }

    // If the skill doesn't exist, create it
    const skill = await Skill.create(req.body);
    res.status(200).send({
      flag: true,
      outdata: { skill },
      message: "Skill Added Successfully",
    });
  } catch (error) {
    console.error("Error creating skill:", error); // Log the error for debugging
    res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error: error.message, // Send the error message in the response
    });
  }
};



const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { technology } = req.body;

    const updateSkill = await Skill.update(
      { technology: technology },
      {
        where: { skillId: id },
      }
    );
    res.status(200).send({
      flag: true,
      message: "Skill updated successfully",
      updateSkill,
    });
  } catch (error) {
    res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error,
    });
  }
};

const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    await Skill.destroy({
      where: {
        skillId: id,
      },
    });
    res.status(200).send({
      flag: true,
      message: "Skill deleted successfully",
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
  getAllSkills,
  getOneSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};
