const TabelaDisco = require('./TabelaDiscos.js')
const DataNotProvided = require('../../../Erros/DataNotProvided.js')
const InvalidField = require('../../../Erros/InvalidField.js')

class Disco {
    constructor({ id, name, author, year, gender, price, creationDate }) {
        this.id = id 
        this.name = name
        this.author = author 
        this.year = year
        this.gender = gender
        this.price = price 
        this.creationDate = creationDate         
    }

    //Validate the fields
    validate() {
        if(typeof this.name !== 'string' || this.name.length === 0) {
            throw new InvalidField('name')
        }

        if(typeof this.gender !== 'string' || this.gender.length === 0) {
            throw new InvalidField('gender')
        }

        if(typeof this.price !== 'number' || this.price === 0) {
            throw new InvalidField('price')
        }
    }

    //Search for information
    async search() {
        const disco = await TabelaDisco.findByID(this.id, this.author)
        this.name = disco.name
        this.author = disco.author
        this.year = disco.year
        this.gender = disco.gender
        this.price = disco.price
        this.creationDate = disco.creationDate
    }

    //Forward the information that must be added
    async add() {
        this.validate()
        const result = await TabelaDisco.insert({
            name: this.name,
            author: this.author,
            year: this.year,
            gender: this.gender,
            price: this.price
        })

        this.id = result.id,
        this.creationDate = result.creationDate
    }

    //Update information
    async update() {
        await TabelaDisco.findByID(this.id, this.author)
        const fields = ['name', 'author', 'year', 'gender']
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

        await TabelaDisco.revise(this.id, dataToUpdate)
    }

    //Forwards the reference of what should be deleted
    remove() {
        return TabelaDisco.delete(this.id, this.author)
    }
}

module.exports = Disco