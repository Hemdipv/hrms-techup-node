module.exports = (sequelize, DataTypes) => {
  const Candidate = sequelize.define("candidate", {
    candidateId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,

      primaryKey: true,
    },
    applicationNumber: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
    },
    currentCTC: {
      type: DataTypes.STRING,
    },
    expectedCTC: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    isRelocate: {
      type: DataTypes.STRING,
    },
    reasonForJobChange: {
      type: DataTypes.STRING,
    },
    noticePeriod: {
      type: DataTypes.STRING,
    },
    experience: {
      type: DataTypes.STRING,
    },
    otherInfo: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startnoticeperiod: {
      type: DataTypes.DATE,
    },
    endnoticeperiod: {
      type: DataTypes.DATE,
    },
    isActive: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    dateOfApplication: {
      type: DataTypes.DATE,
    },
    createdBy: {
      type: DataTypes.INTEGER,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
    },
    statusId: {
      type: DataTypes.INTEGER,
    },
    reportingPerson : {
      type: DataTypes.INTEGER,
    },
    roleId: {
      type: DataTypes.STRING,
    }
  });

  return Candidate;
};
