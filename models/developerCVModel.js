module.exports = (sequelize, DataTypes) => {
  const Chatbot = sequelize.define("developercv", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: DataTypes.INTEGER,
    path: DataTypes.STRING,
  });
  return Chatbot;
};
