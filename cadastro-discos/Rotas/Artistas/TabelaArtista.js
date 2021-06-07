const Model = require('./ModeloTabelaArtista.js')
const NotFound = require('../../Erros/NotFound.js')

module.exports = {
    list() {
        return Model.findAll({ raw: true })
    },

    async insert(author) {
        return Model.create(author)
    },

    async findByID(id) {
        const found = await Model.findOne({
            where: { id: id }
        })

        if(!found) {
            throw new NotFound()
        }

        return found
    }, 

    async revise(id, dataToUpdate) {
        return Model.update(
            dataToUpdate, 
            {
                where: { id: id }
            }
        )
    }, 

    delete(id) {
        return Model.destroy({
            where: { id: id }
        })
    }
}