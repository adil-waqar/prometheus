module.exports = (sequelize, DataTypes) => {
  const Clo = sequelize.define(
    'Clo',
    {
      no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'compositeIndex'
      },
      courseId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeIndex',
        references: {
          model: 'Courses',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    {}
  );
  Clo.associate = models => {
    Clo.belongsTo(models.Course, {
      foreignKey: 'courseId'
    });
    Clo.hasOne(models.CloPloMapping, {
      foreignKey: 'cloId'
    });
  };
  return Clo;
};
