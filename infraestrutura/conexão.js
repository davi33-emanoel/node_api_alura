const mysql = require('mysql2')

const conexão = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'agenda_petshop'
})

module.exports = conexão