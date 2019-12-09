module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cch: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Course.associate = models => {
    Course.belongsToMany(models.Student, {
      through: 'StudentCourses',
      foreignKey: 'courseId'
    });
    Course.belongsToMany(Course, {
      as: 'PreRequisites',
      through: 'CoursePrereq'
    });
    Course.belongsToMany(models.Program, {
      through: models.DegreePlans,
      foreignKey: 'courseId'
    });
  };
  return Course;
};
