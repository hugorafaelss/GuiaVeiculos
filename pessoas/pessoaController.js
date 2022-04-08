const express = require("express");
const router = express.Router();
const Pessoa = require("./Pessoa");
const Veiculo = require("../veiculos/Veiculo");

router.get("/cadastrar", (req, res) => {
    res.render("pessoa/cadastrar")
});

router.post("/pessoa/salvarPessoa", (req, res) => {
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

router.get('/pessoa/edit/:id', (req, res) => {
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

router.post("/pessoa/update", (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var endereco = req.body.endereco;
    var cpf = req.body.cpf;

    Pessoa.update({nome, endereco, cpf}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/visualizar/"+id)
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

router.get("/page/:num", (req, res) => {
    var page = req.params.num;
    var offset = 0;

    if (isNaN(page) || page == 1) {
        offset = 0;
    } else {
        offset = (parseInt(page) - 1) * 8;
    }

    Pessoa.findAndCountAll({
        limit: 8,
        offset: offset
    }).then(pessoas => {
        
        var next;
        if (offset + 8 >= pessoas.count) {
            next = false;
        } else {
            next = true;
        }

        var result = {
            page: parseInt(page),
            next: next,
            pessoas : pessoas
        }
        res.render("pessoa/page", {
            result: result
        });
    })
});

module.exports = router;