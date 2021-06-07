const Roteador = require('express').Router()
const TabelaAutor = require('./TabelaArtista.js')
const TabelaDiscos = require('./Discos/TabelaDiscos.js')
const Author = require('./Artista.js')
const SerializerAuthor = require('../../serializador.js').SerializerAuthor
const RoteadorDiscos = require('./Discos')


Roteador.get('/autores/', async (req, res) => {
    const results = await TabelaAutor.list()
    res.status(200)
    const serializer = new SerializerAuthor(res.getHeader('Content-Type'))
    res.send(serializer.serialize(results))
})

Roteador.get('/autores/:idAuthor', async (req, res, prox) => {
    try {
        const id = req.params.idAuthor
        const author = new Author({ id: id })
        await author.search()
        res.status(200)

        const serializer = new SerializerAuthor(
            res.getHeader('Content-Type'), 
            ['creationDate']
        )

        res.send(serializer.serialize(author))
    } 
    catch (erro) {
        prox(erro)
    }
})

Roteador.post('/autores/', async (req, res, prox) => {
    try {
        const dataReceived = req.body
        const author = new Author(dataReceived)
        await author.add()
        res.status(201)
        
        const serializer = new SerializerAuthor(res.getHeader('Content-Type'))
        res.send(serializer.serialize(author))
    }
    catch (erro) {
        prox(erro)
    }
})

Roteador.put('/autores/:idAuthor', async (req, res, prox) => {
    try {
        const id = req.params.idAuthor
        const dataReceived = req.body
        const data = Object.assign({}, dataReceived, { id: id })
        const author = new Author(data)
        await author.update()
        res.status(204)
        res.end()
    }
    catch (erro) {
        prox(erro)
    }
})

Roteador.delete('/autores/:idAuthor', async (req, res, prox) => {
    try {
        const id = req.params.idAuthor
        const author = new Author({ id: id })
        await author.search()
        await author.remove()
        res.status(204)
        res.end()
    }
    catch (erro) {
        prox(erro)
    }
})

Roteador.get('/discos', async (req, res) => {
    const results = await TabelaDiscos.listarTudo()
    res.status(200)
    res.send(results)
})


const verifyAuthor = async (req, res, prox) => {
    try {
        const id = req.params.idAuthor
        const author = new Author({ id: id })
        await author.search()
        req.author = author
        prox()
    }
    catch (erro) {
        prox(erro)
    }
}

Roteador.use('/autores/:idAuthor/discos', verifyAuthor, RoteadorDiscos)

module.exports = Roteador