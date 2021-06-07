const Sequelize = require('sequelize')
const instance = require('../../Banco-de-Dados')

const columns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    members: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}

const settings = {
    freezeTableaName: true,
    tableName: 'autores',
    timestamps: true,
    createdAt: 'creationDate'
}

module.exports = instance.define('author', columns, settings)