const db = require("../models");
var fs = require("fs");
const { Op } = require("sequelize");
// create main model
const Candidate = db.candidate;
const CandidateSkill = db.candidateskills;
const Candidatedocument = db.candidatedocument;
const User = db.user;
const RoleModule = db.roleModule;
const Module = db.module;
const Candidatestatus = db.candidatestatus;
const Status = db.status;
const { v4: uuid } = require("uuid");
const moment = require("moment");
const sendEmail = require("../Utills/emailService");
const Staff = db.staff;

// const { status } = require("../models");
// main work

//1. create candidate
const addCandidate = async (req, res, next) => {
  const unique_id = uuid();
  let applicationNumberUUID = unique_id.slice(0, 10);
  let info = {
    startnoticeperiod: req.body.startnoticeperiod,
    endnoticeperiod: req.body.endnoticeperiod,
    applicationNumber: applicationNumberUUID,
    name: req.body.name,
    mobile: req.body.mobile,
    jobProfileId: req.body.jobProfileId,
    currentCTC: req.body.currentCTC,
    expectedCTC: req.body.expectedCTC,
    location: req.body.location,
    isRelocate: req.body.isRelocate,
    reasonForJobChange: req.body.reasonForJobChange,
    noticePeriod: req.body.noticePeriod,
    experience: req.body.experience,
    otherInfo: req.body.otherInfo,
    createdBy: req.body.createdBy,
    email: req.body.email,
    gender: req.body.gender,
    isActive: "yes",
    departmentId: req.body.departmentId,
    OtherSkill: req.body.OtherSkill,
    dateOfApplication: moment(req.body.dateOfApplication).format("YYYY-MM-DD"),
    roleId: req.body.roleId,
    reportingPerson:req.body.reportingPerson
  };

  try {
    const {
      candidatePhoto,
      resume,
      others,
      aadhaar,
      salarySlip,
      experienceLetter,
      marksheet,
      companyofferletter,
    } = req?.files || {};
    const {
      createdBy,
      name,
      mobile,
      rating,
      skillId,
      dateOfApplication,
      OtherSkill,
      roleId,
      reportingPerson
    } = req.body;

    if (!name || !mobile || !createdBy || !dateOfApplication) {
      [candidatePhoto, resume, aadhaar, salarySlip, experienceLetter, marksheet, companyofferletter].forEach(fileArray => {
        if (fileArray) {
          fs.unlink(fileArray[0]?.path, function (err) {
            if (err) console.log(err);
            // console.log(`${fileArray[0]?.path} file deleted successfully`);
          });
        }
      });

      res.status(400).send({
        flag: false,
        message: "Please insert all required fields.",
      });
      return false;
    }

    const currentUser = await User.findByPk(createdBy);
    if (!currentUser) {
      res.status(404).send({
        flag: false,
        message: "user not found",
      });
      return false;
    }

    const currentUserRoleId = currentUser?.roleId;
    const allRoleModule = await RoleModule.findAll({
      where: { userId: createdBy },
    });

    const isEditedModule = allRoleModule.filter(
      (f) => f.isEdited == "yes" && Number(f.moduleId) == Number(8)
    );

    if (isEditedModule?.length == 0) {
      [candidatePhoto, resume, aadhaar, salarySlip, experienceLetter, marksheet, companyofferletter].forEach(fileArray => {
        if (fileArray) {
          fs.unlink(fileArray[0]?.path, function (err) {
            if (err) console.log(err);
            // console.log(`${fileArray[0]?.path} file deleted successfully`);
          });
        }
      });

      res.status(200).send({
        flag: false,
        message: "You don't have right to add candidate.",
      });
      return false;
    }

    let allDocs = {};
    let candidateSkillsData = {};

    const candidate = await Candidate.create(info);
    
    console.log("candidatecandidate", candidate)
    if (candidate?.candidateId > 0) {
      await Candidatestatus.create({
        candidateId: candidate?.candidateId,
        statusId: 1,
        remark: req.body.remark,
        createdBy,
        dateOfStatus: moment(dateOfApplication).format("YYYY-MM-DD"),
        lastStatusId: 1,
      });
    }

    if (candidate?.candidateId > 0) {
      candidateSkillsData.skills = await CandidateSkill.create({
        candidateId: candidate?.candidateId,
        rating,
        skillId,
        OtherSkill,
        createdBy,
      });

      if (candidatePhoto) {
        allDocs.candidatedocumentPhoto = await Candidatedocument.create({
          candidateId: candidate?.candidateId,
          fileType: "candidatePhoto",
          docName: candidatePhoto[0]?.filename,
          docPath: candidatePhoto[0]?.path,
          createdBy,
        });
      }
      if (resume) {
        allDocs.candidatedocumentResume = await Candidatedocument.create({
          candidateId: candidate?.candidateId,
          fileType: "candidateResume",
          docName: resume[0]?.filename,
          docPath: resume[0]?.path,
          createdBy,
        });
      }

      if (aadhaar) {
        allDocs.candidatedocumentAadhaar = await Candidatedocument.create({
          candidateId: candidate?.candidateId,
          fileType: "candidateAadhaar",
          docName: aadhaar[0]?.filename,
          docPath: aadhaar[0]?.path,
          createdBy,
        });
      }
      if (salarySlip) {
        allDocs.candidatedocumentSalarySlip = await Candidatedocument.create({
          candidateId: candidate?.candidateId,
          fileType: "candidateSalarySlip",
          docName: salarySlip[0]?.filename,
          docPath: salarySlip[0]?.path,
          createdBy,
        });
      }
      if (experienceLetter) {
        allDocs.candidatedocumentExperienceLetter = await Candidatedocument.create({
          candidateId: candidate?.candidateId,
          fileType: "candidateExperienceLetter",
          docName: experienceLetter[0]?.filename,
          docPath: experienceLetter[0]?.path,
          createdBy,
        });
      }
      if (marksheet) {
        allDocs.candidatedocumentMarksheet = await Candidatedocument.create({
          candidateId: candidate?.candidateId,
          fileType: "candidateMarksheet",
          docName: marksheet[0]?.filename,
          docPath: marksheet[0]?.path,
          createdBy,
        });
      }
      if (companyofferletter) {
        allDocs.candidatedocumentCompanyofferletter = await Candidatedocument.create({
          candidateId: candidate?.candidateId,
          fileType: "candidateCompanyofferletter",
          docName: companyofferletter[0]?.filename,
          docPath: companyofferletter[0]?.path,
          createdBy,
        });
      }
      
      const currentUser = await User.findOne({ where: { userId: createdBy } });
      sendEmail({
        subject: "New Candidate Added",
        html: `<div>
            <p>Hello Sir</p>
            <p>
              I would like to inform you that a new candidate <b>${info?.name}</b> (
              ${info?.email}) is added by ${currentUser.email}, please take follow
              up and keep updating its status.
            </p>
            <br  />
            <p>Thanks and regards,</p>
            <p>${currentUser.email} </p>
          </div>`,
        to: process.env.FROM_EMAIL,
        from: process.env.EMAIL,
      });

      res.status(200).send({
        flag: true,
        outdata: {
          candidate,
          allDocs,
        },
      });
      return;
    } else {
      [candidatePhoto, resume].forEach(fileArray => {
        if (fileArray) {
          fs.unlink(fileArray[0]?.path, function (err) {
            if (err) console.log(err);
            // console.log(`${fileArray[0]?.path} file deleted successfully`);
          });
        }
      });
      res.status(500).send({
        flag: false,
        message: "Something went wrong.",
      });

      return false;
    }
  } catch (error) {
    res.status(500).send({
      flag: false,
      message: "Something went wrong",
      error,
    });
    return;
  }
};
//2. get all candidates
const getAllCandidates = async (req, res) => {
  // console.log("req.query", req.query);
  let { isActive, searchString, endDate, startDate } = req.query;
  let { currentPage } = req.query;
  if (currentPage == null || currentPage == undefined) {
    currentPage = 0;
  }
  if (!isActive) {
    isActive = "";
  }
  if (!searchString) {
    searchString = "";
  }
  if (!startDate) {
    startDate = moment(new Date("1994-01-01")).format("YYYY-MM-DD");
  }
  if (!endDate) {
    let cDate = new Date();
    let year = cDate.getFullYear() + 10;
    let month = cDate.getMonth();
    let date = cDate.getDate();
    endDate = moment(new Date(year, month, date)).format("YYYY-MM-DD");
  }
  let candidates;
  try {
    // candidates = await Candidate.findAndCountAll({
    //   where: {
    //     name: { [Op.like]: `%${searchString}%` },
    //     isActive,
    //   },
    //   offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
    //   limit: Number(process.env.PAGE_LIMIT),
    // });

    // if (!searchString && !isActive) {
    //   if (currentPage == 0) {
    //     candidates = await Candidate.findAndCountAll({});
    //   } else {
    //     candidates = await Candidate.findAndCountAll({
    //       offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
    //       limit: Number(process.env.PAGE_LIMIT),
    //     });
    //   }
    // } else if (isActive && searchString) {
    //   if (currentPage == 0) {
    //     candidates = await Candidate.findAndCountAll({
    //       where: {
    //         name: { [Op.like]: `%${searchString}%` },
    //         isActive,
    //       },
    //     });
    //   } else {
    //     candidates = await Candidate.findAndCountAll({
    //       where: {
    //         name: { [Op.like]: `%${searchString}%` },
    //         isActive,
    //       },
    //       offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
    //       limit: Number(process.env.PAGE_LIMIT),
    //     });
    //   }
    // } else if (searchString) {
    //   if (currentPage == 0) {
    //     candidates = await Candidate.findAndCountAll({
    //       where: {
    //         name: { [Op.like]: `%${searchString}%` },
    //       },
    //     });
    //   } else {
    //     candidates = await Candidate.findAndCountAll({
    //       where: {
    //         name: { [Op.like]: `%${searchString}%` },
    //       },
    //       offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
    //       limit: Number(process.env.PAGE_LIMIT),
    //     });
    //   }
    // } else if (isActive) {
    //   if (currentPage == 0) {
    //     candidates = await Candidate.findAndCountAll({
    //       where: {
    //         isActive,
    //       },
    //     });
    //   } else {
    //     candidates = await Candidate.findAndCountAll({
    //       where: {
    //         isActive,
    //       },
    //       offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
    //       limit: Number(process.env.PAGE_LIMIT),
    //     });
    //   }
    // }

    if (true) {
      if (currentPage == 0) {
        candidates = await Candidate.findAndCountAll({
          order: [["createdAt", "DESC"]],
          where: {
            // name: { [Op.like]: `%${searchString ? searchString : ""}%` },
            // email: { [Op.like]: `%${searchString ? searchString : ""}%` },
            [Op.or]: [
              { name: { [Op.like]: `%${searchString ? searchString : ""}%` } },
              { email: { [Op.like]: `%${searchString ? searchString : ""}%` } },
              {
                mobile: { [Op.like]: `%${searchString ? searchString : ""}%` },
              },
            ],
            isActive: { [Op.like]: `%${isActive ? isActive : ""}%` },
            dateOfApplication: {
              [Op.gte]: new Date(startDate),
              [Op.lte]: new Date(endDate),
              // [Op.lte]: { [Op.like]: `%${endDate ? new Date(endDate) : ""}%` },
            },
          },
        });
      } else {
        candidates = await Candidate.findAndCountAll({
          order: [["createdAt", "DESC"]],

          where: {
            // name: { [Op.like]: `%${searchString ? searchString : ""}%` },
            // email: { [Op.like]: `%${searchString ? searchString : ""}%` },
            [Op.or]: [
              { name: { [Op.like]: `%${searchString ? searchString : ""}%` } },
              { email: { [Op.like]: `%${searchString ? searchString : ""}%` } },
              {
                mobile: { [Op.like]: `%${searchString ? searchString : ""}%` },
              },
            ],
            isActive: { [Op.like]: `%${isActive ? isActive : ""}%` },
            dateOfApplication: {
              [Op.gte]: new Date(startDate),
              [Op.lte]: new Date(endDate),
            },
          },
          offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
          limit: Number(process.env.PAGE_LIMIT),
        });
      }
    }

    // try {
    //     let candidates = await Candidate.findAll()
    // let candidateSkills = await CandidateSkill.findAll()
    // console.log("candidates", candidates);
    res.status(200).send({
      flag: true,
      outdata: { candidates: candidates?.rows },
      totalRecord: candidates?.count,
      // candidateSkills
    });
    return;
  } catch (err) {
    res.status(501).send(err);
    return;
  }
};

//3. get one candidate
const getOneCandidate = async (req, res) => {
  let id = req.params.id;
  try {
    let candidate = await Candidate.findOne({ where: { candidateId: id } });
    let candidatedocuments = await Candidatedocument.findAll({
      where: { candidateId: id },
    });

    let candidateSkills = await CandidateSkill.findAll({
      where: { candidateId: id },
    });
    const candidateStatus = await Candidatestatus.findAll({
      where: { candidateId: id },
    });
    res.status(200).send({
      flag: true,
      outdata: {
        candidate,
        candidateSkills,
        candidatedocuments,
        candidateStatus,
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

//4. update candidate details

const updateCandidate = async (req, res) => {
  let id = req.params.id;
  const {
    // applicationNumber,
    name,
    mobile,
    departmentId,
    currentCTC,
    expectedCTC,
    location,
    isRelocate,
    reasonForJobChange,
    noticePeriod,
    experience,
    otherInfo,
    email,
    isActive,
    updatedBy,
    gender,
    dateOfApplication,
    skillId,
    OtherSkill,
    rating,
    endnoticeperiod,
    startnoticeperiod,
    reportingPerson,
    statusId
  } = req.body;
  let info = {
    // candidateId: req.body.candidateId,
    // applicationNumber,
    name: name,
    mobile,
    jobProfileId: req.body.jobProfileId,

    currentCTC,
    expectedCTC,
    location,
    isRelocate,
    reasonForJobChange: reasonForJobChange,
    noticePeriod,
    experience,
    otherInfo: otherInfo,
    updatedBy,

    email: email,
    gender: gender,
    startnoticeperiod: startnoticeperiod,
    endnoticeperiod: endnoticeperiod,
    isActive,
    // skillId,
    // OtherSkill,
    departmentId,

    dateOfApplication: moment(dateOfApplication).format("YYYY-MM-DD"),
    statusId,
    reportingPerson

  };
  try {
    const candidate = await Candidate.update(info, {
      where: { candidateId: id },
    });
    const { candidatePhoto, resume } = req?.files;

    await CandidateSkill.update(
      {
        rating,
        skillId,
        OtherSkill,
        updatedBy,
      },
      {
        where: { candidateId: id },
      }
    );

    if (1) {
      if (candidatePhoto) {
        let isUpdated;
        isUpdated = await Candidatedocument.update(
          {
            docName: candidatePhoto[0]?.filename,
            docPath: candidatePhoto[0]?.path,
            updatedBy,
          },
          { where: { candidateId: id, fileType: "candidatePhoto" } }
        );
        if (isUpdated[0] == 0) {
          await Candidatedocument.create({
            candidateId: id,
            fileType: "candidatePhoto",
            docName: candidatePhoto[0]?.filename,
            docPath: candidatePhoto[0]?.path,
            updatedBy,
          });
        }
      }
      if (resume) {
        let isUpdated;
        isUpdated = await Candidatedocument.update(
          {
            docName: resume[0]?.filename,
            docPath: resume[0]?.path,
            updatedBy,
          },
          { where: { candidateId: id, fileType: "candidateResume" } }
        );
        if (isUpdated[0] == 0) {
          await Candidatedocument.create({
            candidateId: id,
            fileType: "candidateResume",
            docName: resume[0]?.filename,
            docPath: resume[0]?.path,
            updatedBy,
          });
        }
      }
    }

    if (candidate == 1) {
      const currentUser = await User.findOne({ where: { userId: updatedBy } });

      sendEmail({
        subject: "Candidate Details Updated",
        html: `<div>
            <p>Hello Sir</p>
            <p>
              I would like to inform you that candidate details of <b>${info?.name}</b> (
              ${info?.email}) is updated by ${currentUser.email}.
            </p>
            <br  />
            <p>Thanks and regards,</p>
            <p>${currentUser.email} </p>
          </div>`,
        to: process.env.FROM_EMAIL,
        from: process.env.EMAIL,
      });
      res.status(200).send({
        flag: true,
        message: "Candidate details updated!",
      });
      return;
    } else {
      res.status(200).send({
        flag: false,
        message: "Something went wrong!",
      });
      return;
    }
  } catch (error) {
    res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error,
    });
    return;
  }
};

//5. delete candidate by id

const deleteCandidate = async (req, res) => {
  let id = req.params.id;
  const { isActive, updatedBy, candidateId } = req.body;
  let info = {
    isActive,
    updatedBy,
  };

  try {
    if (!updatedBy) {
      res.status(400).send({
        flag: false,
      });
      return;
    }
    const candidate = await Candidate.update(info, {
      where: { candidateId: id },
    });

    if (candidate == 1) {
      if (isActive == "yes") {
        res.status(200).send({
          flag: true,
          // user,
          message: "Candidate details is recovered.",
        });
        return;
      }
      if (isActive == "no") {
        res.status(200).send({
          flag: true,
          // user,
          message: "Candidate details is deleted.",
        });
        return;
      }
      res.status(404).send({
        flag: false,
        message: "Something went wrong!",
      });
      return;
    } else {
      res.status(404).send({
        flag: false,
        message: "Something went wrong!",
      });
      return;
    }
  } catch (error) {
    res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error,
    });
    return;
  }
};

const getCandidateStatus = async (req, res) => {
  let id = req.params.id;
  try {
    let candidatestatus = await Candidatestatus.findAll({
      where: { candidateId: id },
    });
    const status = await Status.findAll();
    const candidateStatusID = candidatestatus.map((item) => item.statusId);
    const allStatus = status.filter(
      (item) => !candidateStatusID.includes(item.statusId)
    );

    res.status(200).send({
      flag: true,
      outdata: { candidatestatus },
      cadidateStatus: allStatus,
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

const updateCandidateStatus = async (req, res) => {
  
  const unique_id = uuid();
  
  let employeCodeUUID = unique_id.slice(0, 10);

  const {
    candidateId,
    candidateStatusId,
    statusId,
    remark,
    updatedBy,
    dateOfStatus,
  } = req.body;
  
  if (
    !candidateId ||
    // !candidateStatusId ||
    !statusId ||
    !updatedBy ||
    !dateOfStatus
  ) {
    res.status(400).send({
      flag: true,
      message: "Please insert required fields!",
    });
    return;
  }
  
  let info = {
    statusId,
    remark,
    updatedBy,
    dateOfStatus,
    // updatedBy,
    // updatedAt: new Date(),
  };

  try {
    const candidateStatusResponse = await Candidatestatus.create({
      candidateId,
      statusId,
      remark,
      updatedBy,
      dateOfStatus: moment(dateOfStatus).format("YYYY-MM-DD"),
    });
    const updateCandidateStatus = await Candidatestatus.update(
      { lastStatusId: statusId },
      { where: { candidateId: candidateId } }
    );
    const update = await Candidate.update(
      { statusId: statusId },
      { where: { candidateId: candidateId } }
    );

    
    if (statusId == 12) {
      // Assuming you have a Staff model to interact with the staffs table
      const candidate = await Candidate.findOne({ where: { candidateId: candidateId } });
      console.log("hemdip-status", candidate);
      if (candidate) {
        const staffResponse = await Staff.create({
          candidateId: candidate.candidateId,
          name: candidate.name,
          gender: candidate.gender,
          email:candidate.email,
          dateOfBirth:candidate.dateOfBirth,
          fatherName:candidate.fatherName,
          motherName:candidate.motherName,
          maidenName:candidate.maidenName,
          dateOfJoining:candidate.dateOfJoining,
          marritalStatus:candidate.marritalStatus,
          currentAddress:candidate.currentAddress,
          permanentAddress:candidate.permanentAddress,
          mobile:candidate.mobile,
          emergencyContact:candidate.emergencyContact,
          staffPhoto:candidate.staffPhoto,
          createdBy:candidate.createdBy,
          roleId:'1',
          reportingPerson:'test',
          employeCode: employeCodeUUID
          // other fields to be inserted into the staffs table
          // you might need to add more fields here based on your staff table structure
        });

        if (!staffResponse) {
          res.status(500).send({
            flag: false,
            message: "Failed to add candidate to staff!",
          });
          return;
        }
      }
    }

    if (candidateStatusResponse?.candidateStatusId > 0) {
      res.status(200).send({
        flag: true,
        message: "Candidate status updated!",
        outdata: {
          candidateStatus: candidateStatusResponse,
          updateCandidateStatus: updateCandidateStatus,
        },
      });
      return;
    } else {
      res.status(200).send({
        flag: false,
        message: "Something went wrong!",
      });
      return;
    }
  } catch (error) {
    res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error,
    });
    return;
  }
};


const VerifyCandidate = async (req, res) => {
  const { email, mobile } = req.body;

  let candidate;
  try {
    if (email) {
      candidate = await Candidate.findAndCountAll({
        where: {
          email: email,
        },
      });

      if (candidate?.count > 0) {
        res.status(200).send({
          flag: false,
          message: "Email already exist!",
          // outdata: { candidate: candidate?.rows },
          // totalRecord: candidate?.count,
        });
      } else {
        res.status(200).send({
          flag: true,
          message: "",
        });
      }
    } else if (mobile) {
      candidate = await Candidate.findAndCountAll({
        where: {
          mobile: mobile,
        },
      });
      if (candidate?.count > 0) {
        res.status(200).send({
          flag: false,
          message: "Mobile already exist!",
          // outdata: { candidate: candidate?.rows },
          // totalRecord: candidate?.count,
        });
      } else {
        res.status(200).send({
          flag: true,
          message: "",
        });
      }
    } else {
      res.status(400).send({
        flag: false,
        message: "Something went wrong!",
      });
    }
    return;
  } catch (err) {
    res.status(501).send(err);
    return;
  }
};

const updateRemark = async (req, res) => {
  try {
    const data = await Candidatestatus.update(
      { remark: req.body.remark, dateOfStatus: req.body.dateOfStatus },
      { where: { candidateStatusId: req.body.candidateStatusId } }
    );
    res.status(200).send({
      flag: true,
      message: "Candidate Remark Successfully updated!",
      data,
      // totalRecord: candidate?.count,
    });
    return;
  } catch (error) {
    return res.status(501).send(error);
    // return;
  }
};

const getRemark = async (req, res) => {
  try {
    const data = await Candidatestatus.findByPk(req.params.id);

    return res.status(200).send({
      flag: true,
      message: "Data fetch successfully",
      data,
    });
  } catch (error) {
    return res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error,
    });
  }
};
module.exports = {
  addCandidate,
  getAllCandidates,
  getOneCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidateStatus,
  updateCandidateStatus,
  VerifyCandidate,
  updateRemark,
  getRemark,
};
