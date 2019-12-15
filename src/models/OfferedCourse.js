module.exports = (sequelize, DataTypes) => {
  const OfferedCourse = sequelize.define(
    'OfferedCourse',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      termId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Semesters',
          key: 'id'
        }
      },
      courseId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Courses',
          key: 'id'
        }
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Employees',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    {}
  );
  OfferedCourse.associate = models => {
    OfferedCourse.hasMany(models.CourseAssessment, {
      foreignKey: 'offeredCourseId'
    });
    OfferedCourse.belongsToMany(models.Student, {
      through: 'StudentCourses',
      foreignKey: 'offeredCourseId'
    });
    OfferedCourse.hasMany(models.Clo, {
      foreignKey: 'offeredCourseId'
    });
  };
  return OfferedCourse;
};
