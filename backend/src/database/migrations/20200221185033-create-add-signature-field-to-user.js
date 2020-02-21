module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'signature_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'signature_id');
  },
};
