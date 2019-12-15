module.exports = (sequelize, DataTypes) => {
  const Clo = sequelize.define(
    'Clo',
    {
      no: {
        type: DataTypes.INTEGER,
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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    {}
  );
  Clo.associate = models => {
    Clo.belongsTo(models.OfferedCourse, {
      foreignKey: 'offeredCourseId'
    });
    Clo.hasOne(models.CloPloMapping, {
      foreignKey: 'cloId'
    });
    Clo.hasOne(models.CloAssessment, {
      foreignKey: 'cloId'
    });
    Clo.belongsToMany(models.Student, {
      through: models.CloResult,
      foreignKey: 'cloId'
    });
    Clo.hasMany(models.CloResult, {
      foreignKey: 'cloId',
      as: 'CloDetails'
    });
  };
  return Clo;
};
