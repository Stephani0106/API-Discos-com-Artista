class DadosNaoFornecidos extends Error {
    constructor () {
        super ('Não foram fornecidos dados para atualizar!')
        this.name = 'DadosNaofornecidos'
        this.idErro = 1
    }
}

module.exports = DadosNaoFornecidos