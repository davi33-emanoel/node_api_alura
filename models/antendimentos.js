const moment = require('moment')
const axios = require('axios')
const conexão = require('../infraestrutura/conexão')
class Atendimento{
    adiciona(atendimento,res){
        const data_de_criacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const data_e_valida = moment(data).isSameOrAfter(data_de_criacao)
        const cliente_e_valido = atendimento.cliente.length >= 5 
        const validacoes = [
            {   nome: 'data',
                valido: data_e_valida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: cliente_e_valido,
                mensagem :"O nome tem que ser maior que cinco caracteres"
            }
        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existem_erros = erros.length
        if(existem_erros){
            res.status(400).json(erros)
        }
        else{
            const atendimento_datado = {...atendimento, data_de_criacao,data}
        const sql = 'INSERT INTO Atendimentos SET ?'
        conexão.query(sql, atendimento_datado, (erro,resultados) =>{
           if(erro){
               res.status(400).json(erro)
           }
           else{
               res.status(201).json(atendimento)
           }
        })
        }
    }
    lista(res){
        const sql = 'SELECT * FROM Atendimentos'
        conexão.query(sql, (erro,resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(resultados)
            }
        })
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