const conexão = require('./conexão')
const executa_query = (query, parametros='') => {
    return new Promise((resolve, reject) => {
        conexão.query(query, parametros,(erros,resultados,campos) => {
            if(erros){
                reject(erros)
            }
            else{
                resolve(resultados)
            }
        })
    })
}
module.exports = executa_query