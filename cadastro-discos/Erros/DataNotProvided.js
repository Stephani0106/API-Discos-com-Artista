class DataNotProvided extends Error {
    constructor() {
        super("No data provided to update!")
        this.name = 'DataNotProvided'
        this.idErro = 4
    }
}

module.exports = DataNotProvided