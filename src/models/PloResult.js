module.exports = (sequelize, DataTypes) => {
  const PloResult = sequelize.define(
    'PloResult',
    {
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'compositeIndex',
        references: {
          model: 'Students',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      ploId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'compositeIndex',
        references: {
          model: 'Plos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      percentAchieved: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      threshold: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      result: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  PloResult.associate = models => {
    PloResult.belongsTo(models.Plo, {
      foreignKey: 'ploId',
      as: 'PloDetails'
    });
    PloResult.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'StudentDetails'
    });
  };
  return PloResult;
};
