class NaoEncontrado extends Error {
    constructor () {
        super('Metodo de pagamento não foi encontrado')
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado