"use strict";const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Luiz',
        email: 'luiz@gmail.com',
        password_hash: await bcrypt.hash('afsdfqgrwg2w43t', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Dorival',
        email: 'dorival@gmail.com',
        password_hash: await bcrypt.hash('asdfaggqwg2vba', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tai',
        email: 'tai@gmail.com',
        password_hash: await bcrypt.hash('q3ty4gadfb3bab', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down() {},
};
