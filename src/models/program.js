module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define(
    'Program',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Program.associate = models => {
    Program.belongsTo(models.Department, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Program.hasMany(models.Student);
  };
  return Program;
};
