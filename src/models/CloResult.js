module.exports = (sequelize, DataTypes) => {
  const CloResult = sequelize.define(
    'CloResult',
    {
      cloId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clos',
          key: 'id'
        }
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Students',
          key: 'id'
        }
      },
      percentAchieved: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      result: {
        type: DataTypes.STRING,
        allowNull: false
      },
      threshold: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  CloResult.associate = models => {
    CloResult.belongsTo(models.Clo, {
      foreignKey: 'cloId',
      as: 'CloDetails'
    });
  };
  return CloResult;
};
