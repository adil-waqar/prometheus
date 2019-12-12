const { Program } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Plo = sequelize.define(
    'Plo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true
      },
      threshold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validation: {
          min: 0,
          max: 100
        }
      }
    },
    {}
  );
  Plo.associate = models => {
    Plo.belongsTo(models.Program, {
      foreignKey: {
        primaryKey: true
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Plo.belongsToMany(models.Course, {
      foreignKey: 'ploId',
      through: models.CoursePlo
    });
  };
  return Plo;
};
