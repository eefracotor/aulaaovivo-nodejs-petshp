const express = require('express')
const sqlite3 = require('sqlite3')
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

const db = new sqlite3.Database('./sql/DB.db', (err) => {
    if (err) {
        console.log("Erro ao abrir base de dados " + err.message);
    } else {
        console.log("Conectado com o Banco de Dados")
    }
})

app.post("/cadastro", (req, res, next) => {    
    // var senhaCriptografada = bcrypt.hashSync(req.body.senha, salt)    
    // console.log("Senha Mascarada: ", senhaCriptografada)
    console.log(req.body)
    
    db.run("INSERT INTO cliente (nome, telefone, cpf) VALUES(?,?,?)",
    [req.body.nome, req.body.telefone, req.body.cpf],
    function(err, result){
        if(err) {
            
            res.status(400).json({ "error": err.message })
            return;
        }
        res.status(201).json({
            "ID do Usuario Cadastrado": this.lastID
        })
    })
})

app.listen(3000, () => {
    console.log('Iniciando o servidor express')
})