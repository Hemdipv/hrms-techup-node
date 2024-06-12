module.exports = (sequelize, DataTypes) => {
  const Developer = sequelize.define("developer", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    qualification: DataTypes.STRING,
    experience: DataTypes.STRING,
    userCompanyName: DataTypes.STRING,
    designation: DataTypes.STRING,
    document: DataTypes.STRING,
    companyName: DataTypes.STRING,
    companyWebsite: DataTypes.STRING,
  });
  return Developer;
};
