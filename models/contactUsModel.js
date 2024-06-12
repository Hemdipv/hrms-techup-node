module.exports = (sequelize, DataTypes) => {
  const ContactUs = sequelize.define("contactus", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    service: DataTypes.STRING,
    projectStartAt: DataTypes.STRING,
    subject: DataTypes.STRING,
    document: DataTypes.STRING,
    companyName: DataTypes.STRING,
    companyWebsite: DataTypes.STRING,
    requirement: DataTypes.STRING,
    projectBrief: DataTypes.STRING,
  });
  return ContactUs;
};
