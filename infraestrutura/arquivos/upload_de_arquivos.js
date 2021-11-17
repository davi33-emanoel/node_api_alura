const fs = require("fs");
const path = require("path");
module.exports = (caminho, nome_do_arquivo, callback_imagem_criada) => {
  const tipos_validos = ["jpg", "png", "jpeg", "gif"];
  const tipo = path.extname(caminho);
  const tipo_e_valido = tipos_validos.indexOf(tipo.substring(1))!== -1;
  if (tipo_e_valido) {
    const novo_caminho = `../../assets/imagens/${nome_do_arquivo}${tipo}`;
    fs.createReadStream(caminho)
      .pipe(fs.createWriteStream(novo_caminho))
      .on("finish", () => {
        callback_imagem_criada(false,novo_caminho);
      });
  } else {
      const erro= "Tipo é invalido"
    callback_imagem_criada(erro)
  }
};
