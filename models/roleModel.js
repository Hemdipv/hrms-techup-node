module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("role", {
    roleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING,
    },
    // isActive: {
    //   type: DataTypes.BOOLEAN,
    // },
  });
  return Role;
};
