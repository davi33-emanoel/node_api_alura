const Atendimentos = require('../models/antendimentos')
module.exports = (app) => {
  app.get("/atendimentos", (req, res) =>{
    Atendimentos.lista()
      .then(resultados => res.status(200).json(resultados))
      .catch(erros => res.status(400).json(erros))
  })

  app.get("/atendimentos/:id", (req, res) =>{
    const id = parseInt(req.params.id)
    Atendimentos.busca_por_id(id,res)
  })

  app.post('/atendimentos',(req,res)=> {
    const atendimento = req.body
    Atendimentos.adiciona(atendimento)
      .then(atendimento_cadastrado => res.status(201).json(atendimento_cadastrado))
      .catch(erros => res.status(400).json(erros))
  })
  app.patch('/atendimentos/:id', (req, res) =>{
    const id = parseInt(req.params.id)
    const valores = req.body
    Atendimentos.altera(id,valores,res)
  })
  
  app.delete('/atendimentos/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    Atendimentos.deleta(id,res)
  })
};
