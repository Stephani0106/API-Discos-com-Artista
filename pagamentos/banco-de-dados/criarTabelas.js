const ModeloTabela = require('../rotas/modeloTabelas')

ModeloTabela
    .sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)