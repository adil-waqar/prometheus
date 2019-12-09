module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    'Department',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Department.associate = models => {
    Department.hasMany(models.Employee, { foreignKey: 'departmentId' });
    Department.hasMany(models.Program);
  };
  return Department;
};
