const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const connection = require("./database/database")
const Pessoa = require("./pessoas/Pessoa");
const Veiculo = require("./veiculos/Veiculo");

const pessoasController = require("./pessoas/pessoaController");
const veiculosController = require("./veiculos/veiculosController");

//Conectando com o Banco de Dados.
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o Banco de Dados feita")
    })
    .catch((msgError) => {
        console.log(msgError);
    })

// Utilizando o body parser.
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

// Dizer para o Express utilizar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Rotas

app.get("/", (req, res) => {
    Pessoa.findAll({
        raw: true, order: [
            ['id', 'ASC']
        ]
    }).then(pessoas => {
        res.render("index", {
            pessoas: pessoas
        });
    })
});

app.use("/", pessoasController);
app.use("/", veiculosController);

app.listen(3000, () => { console.log("Servidor rolando"); })