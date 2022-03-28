const express = require("express");
const router = express.Router();
const Pessoa = require("./Pessoa");
const Veiculo = require("../veiculos/Veiculo");

router.get("/cadastrar", (req, res) => {
    res.render("pessoa/cadastrar")
});

router.post("/salvarPessoa", (req, res) => {
    var nome = req.body.nome;
    var telefone = req.body.telefone;
    var endereco = req.body.endereco;
    var cpf = req.body.cpf;
    Pessoa.create({
        nome: nome,
        telefone: telefone,
        endereco: endereco,
        cpf: cpf
    }).then(() => {
        res.redirect("/")
    })
})

router.get('/visualizar/:id', (req, res) => {
    var id = req.params.id;
    Pessoa.findByPk(id).then(pessoa => {
        if (pessoa != undefined) {
            Veiculo.findAll({
            where: {pessoaId: pessoa.id},
        }).then(veiculos => {
            res.render("pessoa/visualizar", {
                pessoa: pessoa,
                veiculos: veiculos
            });
        })
           
        } else {
            res.redirect("/");
        }

    });
})

router.get('/edit/:id', (req, res) => {
    var id = req.params.id;
    Pessoa.findByPk(id).then(pessoa => {
        if (pessoa != undefined) {
            res.render("pessoa/edit", {pessoa: pessoa});
        } else {
            res.redirect("/");
        }
    }).catch(erro => {
        res.redirect("/");
    })
});

router.post("pessoa/update", (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var endereco = req.body.endereco;
    var cpf = req.body.cpf;

    Pessoa.update({nome, endereco, cpf}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/")
    })
})

router.post("/pessoa/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined) {
        if(!isNaN(id)) {
            Pessoa.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/");
            });
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

module.exports = router;