const Sequelize = require('sequelize')
const config = require('config')

//Defines the connection settings through Sequelize, getting the information from a separate file (config/default.json)
const instance = new Sequelize(
    config.get('mysql.banco-de-dados'),
    config.get('mysql.usuario'),
    config.get('mysql.senha'),
    {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }
)

module.exports = instance