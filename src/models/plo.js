const { Program } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Plo = sequelize.define(
    'Plo',
    {
      no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'compositeIndex'
      },
      threshold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validation: {
          min: 0,
          max: 100
        }
      },
      programId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Programs',
          key: 'id'
        },
        unique: 'compositeIndex'
      }
    },
    {}
  );
  Plo.associate = models => {
    Plo.belongsTo(models.Program, {
      foreignKey: 'programId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Plo.belongsToMany(models.Course, {
      foreignKey: 'ploId',
      through: models.CoursePlo
    });
    Plo.hasMany(models.CloPloMapping, {
      foreignKey: 'ploId'
    });
    Plo.hasMany(models.PloResult, {
      foreignKey: 'ploId',
      as: 'PloDetails'
    });
  };
  return Plo;
};
