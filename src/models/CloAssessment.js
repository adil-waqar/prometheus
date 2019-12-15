module.exports = (sequelize, DataTypes) => {
  const CloAssessment = sequelize.define(
    'CloAssessment',
    {
      cloId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        unique: true
      },
      quiz: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validation: {
          min: 0,
          max: 100
        }
      },
      assignment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validation: {
          min: 0,
          max: 100
        }
      },
      mid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validation: {
          min: 0,
          max: 100
        }
      },
      final: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validation: {
          min: 0,
          max: 100
        }
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
  CloAssessment.associate = models => {
    CloAssessment.belongsTo(models.Clo, {
      foreignKey: 'cloId'
    });
  };
  return CloAssessment;
};
