const custom_express = require("./config/custom_express.js");
const conexão = require("./infraestrutura/database/conexão");
const tabelas = require("./infraestrutura/database/tabelas")

conexão.connect(erro =>{
    if(erro){
        console.log(erro)
    }
    else{
        console.log("conectado")
    }
    tabelas.init(conexão)

    const app = custom_express();

app.listen(3000, console.log("server esta de ok!."));

})