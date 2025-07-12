const {DataTypes} = require('sequelize');
const sequelize = require('../config/database')

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    defaultScope: {
    // Por padrão, exclui a senha das buscas
    attributes: { exclude: ['password'] },
  },
  scopes: {
    // Um escopo especial para incluir a senha quando necessário
    withPassword: {
      attributes: { include: ['password'] },
    },
  },
});

module.exports = User;
