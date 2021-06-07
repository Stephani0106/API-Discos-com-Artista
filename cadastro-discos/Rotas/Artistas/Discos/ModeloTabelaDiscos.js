const Sequelize = require('sequelize')
const Instance = require('../../../Banco-de-Dados')

const tableColumns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {    //Deve receber o ID do autor
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
            model: require('../ModeloTabelaArtista.js'),
            key: 'id'
        }
    },
    year: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
}

const settings = {
    freezeTableName: true,
    tableName: 'discos',
    timestamps: true,
    createdAt: 'creationDate'
};

module.exports = Instance.define('disco', tableColumns, settings)