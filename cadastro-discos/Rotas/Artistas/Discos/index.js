const roteador = require('express').Router({ mergeParams: true })
const TabelaDiscos = require('./TabelaDiscos.js')
const Disco = require('./Discos.js')
const SerializerDisk = require('../../../serializador.js').SerializerDisk

//List all discs by a given author
roteador.get('/', async (req, res) => {
    const disks = await TabelaDiscos.list(req.author.id)
    res.send(JSON.stringify(disks))
})

//Search for a disk with a specific id
roteador.get('/:idDisk', async (req, res, prox) => {
    try {
        const identifiers = {
            id: req.params.idDisk,
            author: req.author.id
        }
        const disk = new Disco(identifiers)

        await disk.search()
        res.status(200)

        const serializer = new SerializerDisk(
            res.getHeader('Content-Type'),
            ['creationDate']
        )

        res.send(serializer.serialize(disk))
    }
    catch (erro) {
        prox(erro)
    }
})

//Insert disks into the database, linking with the author id
roteador.post('/', async (req, res, prox) => {
    try {
        const idAuthor = req.author.id
        const body = req.body
        const data = Object.assign({}, body, { author: idAuthor })
        const disk = new Disco(data)
        await disk.add()
        res.status(201)
        res.send(disk)
    }
    catch (erro) {
        prox(erro)
    }
})

//Update information from a disk
roteador.put('/:idDisk', async (req, res, prox) => {
    try {
        const identifiers = {
            id: req.params.idDisk,
            author: req.author.id
        }

        const body = req.body
        console.log(body)
        const data = Object.assign({}, body, identifiers)
        const disk = new Disco(data)
        await disk.update()
        res.status(204)
        res.end()
    }
    catch (erro) {
        prox(erro)
    }
})

//Delete information from a disk
roteador.delete('/:idDisk', async (req, res, prox) => {
    try {
        const identifiers = {
            id: req.params.idDisk,
            author: req.author.id
        }

        const disk = new Disco(identifiers)
        await disk.remove()
        res.status(204)
        res.end()
    }
    catch (erro) {
        prox(erro)
    }
})

module.exports = roteador