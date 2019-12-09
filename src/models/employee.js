module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    'Employee',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Employee.associate = models => {
    Employee.belongsTo(models.Department, {
      foreignKey: 'departmentId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Employee;
};
