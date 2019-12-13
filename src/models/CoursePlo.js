module.exports = (sequelize, DataTypes) => {
  const CoursePlo = sequelize.define(
    'CoursePlo',
    {
      percentAchieved: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validation: {
          min: 0,
          max: 100
        }
      },
      courseId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Course',
          key: 'id'
        }
      },
      ploId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Plo',
          key: 'id'
        }
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
  CoursePlo.associate = models => {};

  return CoursePlo;
};
