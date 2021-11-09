class tabelas {
  init(conexão) {
    this.conexão = conexão;
    console.log("tabelas foram chamadas");
    this.criar_atendimentos()
  }

  criar_atendimentos() {
    const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(30), servico varchar(30) NOT NULL,data datetime NOT NULL,data_de_criacao datetime NOT NULL,status varchar(20) NOT NULL, observacoes text, PRIMARY KEY (id))'
    this.conexão.query( sql, erro=>{
        if(erro){
            console.log(erro)
        }
        else {
            console.log("Tabelas estão ok")
        }
    });
  }
}
module.exports = new tabelas();
