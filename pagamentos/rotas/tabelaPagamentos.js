const Modelo = require('./modeloTabelas')
const NaoEncontrado = require('../erros/NaoEncontrado')
module.exports = {
    listar() {
        return Modelo.findAll()
    },
    
    inserir(pagamento) {
        return Modelo.create(pagamento)
    },

    async pegarPorId (id) {
        const encontrado = await Modelo.findOne({
            where: {id: id}
        })
        if (!encontrado) {
            throw new NaoEncontrado()
        }

        return encontrado
    },

    remover(id){
        return Modelo.destroy({
            where: {id: id}
        })
    },

    atualizar(id, dadosParaAtualizar){
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: {id: id}
            }
        )
    }


}