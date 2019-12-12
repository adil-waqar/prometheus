module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define(
    'Program',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Program.associate = models => {
    Program.hasMany(models.Plo, {
      foreignKey: {
        primaryKey: true
      }
    });
    Program.belongsTo(models.Department, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Program.hasMany(models.Student);
    Program.belongsToMany(models.Course, {
      through: models.DegreePlans,
      foreignKey: 'programId'
    });
  };

  return Program;
};
