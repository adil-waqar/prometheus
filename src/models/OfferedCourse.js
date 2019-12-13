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
        type: DataTypes.UUID,
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
  OfferedCourse.associate = models => {};
  return OfferedCourse;
};
