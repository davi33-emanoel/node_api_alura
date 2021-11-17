const conexão = require('../infraestrutura/database/conexão')
const upload_de_arquivos = require('../infraestrutura/arquivos/upload_de_arquivos')
class Pet {
    adiciona(pet, res){
        const query='INSERT INTO Pets  SET ?'
        upload_de_arquivos(pet.imagem,pet.nome,(erro,novo_caminho)=>{
            if (erro){
                console.log(erro)
                res.status(400).json({erro})
            }else{
                const novo_pet= {nome:pet.nome,imagem:novo_caminho}

                conexão.query(query, novo_pet, erro =>{
                    if(erro){
                        console.log(erro)
                        res.status(400).json(erro)
                    }
                    else{
                        res.status(200).json(novo_pet)
                    }
                })
            }
        })
    }
}
module.exports = new Pet()