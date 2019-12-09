module.exports = (sequelize, DataTypes) => {
  const DegreePlans = sequelize.define(
    'DegreePlans',
    {
      semesterNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validation: {
          min: 1,
          max: 8
        }
      }
    },
    {}
  );
  DegreePlans.associate = models => {};

  return DegreePlans;
};
