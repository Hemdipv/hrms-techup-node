module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define("staff", {
    staffId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
    },
    employeCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    candidateId: {
      type: DataTypes.INTEGER,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    DOB_M_D: {
      type: DataTypes.STRING,
    },
    fatherName: {
      type: DataTypes.STRING,
    },
    motherName: {
      type: DataTypes.STRING,
    },
    maidenName: {
      type: DataTypes.STRING,
    },
    marritalStatus: {
      type: DataTypes.STRING,
    },
    currentAddress: {
      type: DataTypes.STRING,
    },
    permanentAddress: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergencyContact: {
      type: DataTypes.STRING,
    },
    dateOfJoining: {
      type: DataTypes.DATE,
    },

    dateOfRelieving: {
      type: DataTypes.DATE,
    },
    infoRelieving: {
      type: DataTypes.STRING,

    },

    isActive: {
      type: DataTypes.STRING,
    },
    createdBy: {
      type: DataTypes.INTEGER,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
    },
    reportingPerson: {
      type: DataTypes.INTEGER,
    }
  });

  return Staff;
};
