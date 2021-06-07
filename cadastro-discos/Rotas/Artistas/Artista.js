const TabelaAutor = require('./TabelaArtista.js')
const InvalidField = require('../../Erros/InvalidField.js')
const DataNotProvided = require('../../Erros/DataNotProvided.js')


class Author {
    constructor({ id, name, gender, members, creationDate }) {
        this.id = id
        this.name = name
        this.gender = gender
        this.members = members
        this.creationDate = creationDate 
    }

    async add() {
        this.validate()

        const results = await TabelaAutor.insert({
            name: this.name,
            gender: this.gender,
            members: this.members
        })
        this.id = results.id
        this.creationDate = results.creationDate
    }

    async search() {
        const found = await TabelaAutor.findByID(this.id)
        this.name = found.name
        this.gender = found.gender
        this.members = found.members
        this.creationDate = found.creationDate
    }

    async update() {
        await TabelaAutor.findByID(this.id)
        const fields = ['name', 'gender', 'members']
        const dataToUpdate = {}

        fields.forEach((field) => {
            const value = this[field]

            if(typeof value === 'string' && value.length > 0) {
                dataToUpdate[field] = value
            }
        })

        if(Object.keys(dataToUpdate).length === 0) {
            throw new DataNotProvided()
        }

        await TabelaAutor.revise(this.id, dataToUpdate)
    }

    remove() {
        return TabelaAutor.delete(this.id)
    }

    validate() {
        const fields = ['name', 'gender', 'members']

        fields.forEach(field => {
            const value = this[field]

            if(typeof value !== 'string' || value.length === 0) {
                throw new InvalidField(field)
            }
        })
    }
}

module.exports = Author