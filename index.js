const express = require('express')
const sqlite3 = require('sqlite3')
const app = express();
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10)
// const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

const db = new sqlite3.Database('./sql/DB.db', (err) => {
    if (err) {
        console.log("Erro ao abrir base de dados " + err.message);
    } else {
        console.log("Conectado com o Banco de Dados")
    }
})

app.post("/cliente", (req, res, next) => {    
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

app.get("/:id", (req, res, next) => {
    const id = req.params.id;
    db.all(`SELECT * FROM cliente WHERE id=${id}`,
    function(err, result){
        if(err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.send(result);
    })
})


app.patch("/edit/:id", (req, res, next) => {
    const id = req.params.id;
    db.all(`UPDATE cliente SET username="p3dr0", senha="123456" WHERE id=${id}`,
    function(err, result){
        if(err){
            res.status(400).jsoon({"error":err.message})
            return;
        }
        res.send(result);
    })
})

app.post("/cadastro", (req, res, next) =>{
    var senhaCriptografada = bcrypt.hashSync(req.body.senha, salt)    
   console.log("Senha Mascarada: ", senhaCriptografada)
   db.all('SELECT username FROM cliente WHERE username="Virgi22")',
    [req.body.username],
    function(){

    })
})

// app.post("/cadastro", (req, res, next) => {    
//     var senhaCriptografada = bcrypt.hashSync(req.body.senha, salt)    
//     console.log("Senha Mascarada: ", senhaCriptografada)
//     db.get('SELECT username FROM cliente WHERE username="Virgi22")',
//     [req.body.username],
//     function(err, result){
//         if (res.status(200)){
//             res.json({ error: "Usuário já existe"})                         
//         } else {
//             db.run("INSERT INTO cliente (nome, telefone, cpf, username, senha) VALUES(?,?,?,?,?)",
//             [req.body.nome, req.body.telefone, req.body.cpf, req.body.username, senhaCriptografada])
//         }
//         res.status(201).json({
//             "ID do Usuario Cadastrado": this.lastID
//         })        
//     })
// })


/*LOGIN*/

// const confirmaLogin = (req, res, next) => {
//     db.get("SELECT senha FROM <tabela> WHERE <tabela>.username = (?)",
//      [req.body.username], (err, rows) => {  
//         if (err) {        
//             res.json({ error: "Usuário não cadastrado"})          
//         } else {          
//             const seValido = bcrypt.compareSync(req.body.senha, rows.senha);          
//             if (seValido) {
//                next()                  
//                } else {
//                 res.json({ error: "Senha Inválida"})                  
//                }
//             }
//         })
//     }

// app.post("/login", confirmaLogin, (req, res) =>  {
//     res.send("Bem-vindo " + req.body.username)
// })


app.listen(3000, () => {
    console.log('Iniciando o servidor express')
})