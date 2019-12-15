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
      },
      programId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Programs',
          key: 'id'
        }
      }
    },
    {}
  );
  Student.associate = models => {
    Student.belongsToMany(models.OfferedCourse, {
      through: 'StudentCourses',
      foreignKey: 'studentId'
    });
    Student.belongsTo(models.Program, {
      foreignKey: 'programId'
    });
    Student.hasMany(models.AssessmentResult, {
      foreignKey: 'studentId'
    });
    Student.belongsToMany(models.Clo, {
      through: models.CloResult,
      foreignKey: 'studentId'
    });
    Student.hasMany(models.PloResult, {
      foreignKey: 'studentId',
      as: 'StudentDetails'
    });
  };
  return Student;
};
