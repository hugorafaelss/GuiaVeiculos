const Sequelize = require("sequelize");
const connection = require("../database/database");

const Pessoa = connection.define('pessoas', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

Pessoa.sync({force: false}).then(() => {

});

module.exports = Pessoa;