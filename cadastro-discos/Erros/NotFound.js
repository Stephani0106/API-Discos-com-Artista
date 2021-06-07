class NotFound extends Error {
    constructor() {
        super("Not found!")
        this.name = 'NotFound'
        this.idErro = 2
    }
}

module.exports = NotFound