const TabelaPagamentos = require('./tabelaPagamentos')
const DadosNaoFornecidos = require('../erros/DadosNaoFornecidos')

class Pagamentos {
    constructor ({id, nome, desconto, multiplicador}) {
        this.id = id
        this.nome = nome
        this.desconto = desconto
        this.multiplicador = multiplicador + ((100-desconto)/100)
    }

    async criar() {
        const resultado = await TabelaPagamentos.inserir({
            nome: this.nome,
            desconto: this.desconto,
            multiplicador: this.multiplicador
        })
        this.id = resultado.id
    }

    async carregar() {
        const encontrado = await TabelaPagamentos.pegarPorId(this.id)
        this.id = encontrado.id
        this.nome = encontrado.nome
        this.desconto = encontrado.desconto
        this.multiplicador = encontrado.multiplicador
    }

    remover() {
        return TabelaPagamentos.remover(this.id)
    }

    async atualizar(){
        await TabelaPagamentos.pegarPorId(this.id)
        const campos = ['nome', 'desconto']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]
            dadosParaAtualizar[campo] = valor
        })

        if(Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        await TabelaPagamentos.atualizar(this.id, dadosParaAtualizar)
    }
}

module.exports = Pagamentos