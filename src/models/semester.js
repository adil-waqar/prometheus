module.exports = (sequelize, DataTypes) => {
  const Semester = sequelize.define(
    'Semester',
    {
      term: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeIndex'
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'compositeIndex'
      }
    },
    {}
  );
  Semester.associate = models => {
    Semester.belongsToMany(models.Course, {
      through: models.OfferedCourse,
      foreignKey: 'termId'
    });
  };
  return Semester;
};
