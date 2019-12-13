module.exports = (sequelize, DataTypes) => {
  const AssessmentResult = sequelize.define(
    'AssessmentResult',
    {
      courseAssessmentId: {
        type: DataTypes.INTEGER,
        unique: 'compositeIndex',
        allowNull: false,
        references: {
          model: 'CourseAssessments',
          key: 'id'
        }
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'compositeIndex',
        references: {
          model: 'Students',
          key: 'id'
        }
      },
      marks: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      outOf: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  AssessmentResult.associate = models => {
    AssessmentResult.belongsTo(models.CourseAssessment, {
      foreignKey: 'courseAssessmentId'
    });
    AssessmentResult.belongsTo(models.Student, {
      foreignKey: 'studentId'
    });
  };
  return AssessmentResult;
};
