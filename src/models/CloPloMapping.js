module.exports = (sequelize, DataTypes) => {
  const CloPloMapping = sequelize.define(
    'CloPloMapping',
    {
      cloId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Clos',
          key: 'id'
        }
      },
      ploId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Plos',
          key: 'id'
        }
      }
    },
    {}
  );
  CloPloMapping.associate = models => {};
  return CloPloMapping;
};
