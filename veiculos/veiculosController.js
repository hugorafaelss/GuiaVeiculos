const express = require("express");
const router = express.Router();
const Veiculo = require("./Veiculo");
const Pessoa = require("../pessoas/Pessoa");
const { route } = require("express/lib/application");

router.post("/veiculo", (req, res) => {
    var marca = req.body.marca;
    var modelo = req.body.modelo;
    var placa = req.body.placa;
    var renavam = req.body.renavam;
    var pessoaId = req.body.pessoa;
    Veiculo.create({
        marca: marca,
        modelo: modelo,
        placa: placa,
        renavam: renavam,
        pessoaId: pessoaId,
    }).then(() => {
        res.redirect("visualizar/"+pessoaId);
    })
})

router.get('/veiculo/edit/:id', (req, res) => {
    var id = req.params.id;
    Veiculo.findByPk(id).then(veiculo => {
        if (veiculo != undefined) {
            res.render("veiculo/edit", {veiculo: veiculo});
        } else {
            res.redirect("/");
        }
    }).catch(erro => {
        res.redirect("/");
    })
});

router.post("/veiculo/update", (req, res) => {
    var id = req.body.id;
    var marca = req.body.marca;
    var modelo = req.body.modelo;
    var placa = req.body.placa;
    var renavam = req.body.renavam;
    var idPessoa = req.body.idPessoa;

    Veiculo.update({marca, modelo, placa, renavam}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/visualizar/"+idPessoa)
    })
})

router.post("/veiculo/delete", (req, res) => {
    var id = req.body.id;
    var idPessoa = req.body.idPessoa;
    if(id != undefined) {
        if(!isNaN(id)) {
            Veiculo.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/visualizar/"+idPessoa);
            });
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

module.exports = router;