const moment = require('moment')
const axios = require('axios')
const conexão = require('../infraestrutura/database/conexão')
const repositorio = require('../repository/atendimento')
class Atendimento{
    constructor(){
        this.data_e_valida =({data,data_de_criacao})=> {moment(data).isSameOrAfter(data_de_criacao)}
        this.cliente_e_valido =(tamanho)=> {tamanho >= 5}
        this.valida = parametros=>{this.validacoes.filter(campo =>{const {nome}= campo
            const parametro=parametros[nome]
            return !campo.valido(parametro)})}
        this.validacoes = [
            {   nome: 'data',
                valido: this.data_e_valida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.cliente_e_valido,
                mensagem :"O nome tem que ser maior que cinco caracteres"
            }
        ]
    }
    adiciona(atendimento){
        const data_de_criacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const parametros={
            data:{data,data_de_criacao},
            cliente:{tamanho:atendimento.cliente.length}
        }
        const erros =this.valida(parametros)
        const existem_erros = erros.length
        if(existem_erros){
            return new Promise((resolve, reject)=> reject(erros))
        }
        else{
        const atendimento_datado = {...atendimento, data_de_criacao,data}
        return repositorio.adiciona(atendimento_datado)
            .then(resultados => {
                const id =resultados.insertId
                return ({...atendimento,id})
        })
        }
    }
    lista(){
        return repositorio.lista()
    }
    busca_por_id(id,res){
        const sql = `SELECT * FROM Atendimentos WHERE id =${id}`
        conexão.query(sql,async (erro, resultados) =>{
            const atendimento = resultados[0]
            const cpf = atendimento.cliente
            if(erro){
                res.status(400).json(erro)
            }
            else{
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data
                res.status(200).json(atendimento)
            }
        })
    }
    altera(id,valores,res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE ID = ?'
        conexão.query(sql,[valores,id],(erro,resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json({...valores, id})
            }
        })
    }
    deleta(id,res){
        const sql = 'DELETE FROM Atendimentos WHERE id=?'
        conexão.query(sql,id,(erro,resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json({id})
            }
        })
    }
}
module.exports = new Atendimento