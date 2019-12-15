module.exports = (sequelize, DataTypes) => {
  const CourseAssessment = sequelize.define(
    'CourseAssessment',
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeIndex'
      },
      offeredCourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'compositeIndex',
        references: {
          model: 'OfferedCourses',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    },
    {}
  );
  CourseAssessment.associate = models => {
    CourseAssessment.belongsTo(models.OfferedCourse, {
      foreignKey: 'offeredCourseId'
    });
    CourseAssessment.hasMany(models.AssessmentResult, {
      foreignKey: 'courseAssessmentId'
    });
  };
  return CourseAssessment;
};
