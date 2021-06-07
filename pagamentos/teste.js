const { default: axios } = require("axios");
var dados = teste.pegarDados()

console.log(dados)

async function pegarDados () {
   const data = await axios.get("http://localhost:3100/API/pagamentos")
   return data.data
}


