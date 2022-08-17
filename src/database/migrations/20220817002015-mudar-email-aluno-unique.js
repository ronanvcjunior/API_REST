module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'alunos',
      'email',
      {
        type: Sequelize.STRING,
        AllowNull: false,
        unique: true,
      },
    );
  },

  async down() {},
};
