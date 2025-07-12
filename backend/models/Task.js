const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Tasks', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Task;

