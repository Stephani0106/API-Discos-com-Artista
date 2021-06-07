const Sequelize = require('sequelize')
const instancia = require('../banco-de-dados/index')

const colunas = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desconto: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    multiplicador: {
        type: Sequelize.FLOAT,
        allowNull: true
    }
}
const opcoes = {
    freezeTableName: true,
    tableName: 'Pagamentos',
    version: 'versao'
}


module.exports = instancia.define('pagamento', colunas, opcoes)