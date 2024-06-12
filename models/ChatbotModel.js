module.exports = (sequelize, DataTypes) => {
  const Chatbot = sequelize.define("chatbot", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    number: DataTypes.STRING,
    requirement: DataTypes.STRING,
    sector: DataTypes.STRING,
  });
  return Chatbot;
};
