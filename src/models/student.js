module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Student.associate = function(models) {
    Student.belongsToMany(models.Course, {
      through: 'StudentCourses',
      foreignKey: 'studentId'
    });
  };
  return Student;
};
