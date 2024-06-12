module.exports = (sequelize, DataTypes) => {
    const Leave = sequelize.define("LeaveRequest", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      staffId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leave_body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      create_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending', // default to 'pending'
      },
      approve_by: {
        type: DataTypes.INTEGER,
      }
    }, {
      timestamps: false,
      tableName: 'leave_requests'
    });
    return Leave;
  };
  