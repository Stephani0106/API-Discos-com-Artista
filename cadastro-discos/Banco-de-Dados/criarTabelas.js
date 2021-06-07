const Models = [
    require('../Rotas/Artistas/ModeloTabelaArtista.js'),
    require('../Rotas/Artistas/Discos/ModeloTabelaDiscos.js')
]

async function createTables() {
    for(let cont = 0; cont < Models.length; cont++) {
        const model = Models[cont]
        await model.sync()
    }
}

createTables()


// const Model = require('../Rotas/Artistas/Discos/ModeloTabelaDiscos.js')

// Model
//     //Synchronizes with database
//     .sync()
//     //Return a success message
//     .then(() => console.log("Table created successfully"))
//     //Catch the error with catch and return the same
//     .catch(console.log)