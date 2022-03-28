const Sequelize = require("sequelize");
const connection = require("../database/database");
const Pessoa = require("../pessoas/Pessoa");

const Veiculo = connection.define("veiculos", {
    marca: {
        type: Sequelize.STRING,
        allowNull: false
    },
    modelo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    placa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    renavam: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pessoaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Pessoa.hasMany(Veiculo);
Veiculo.belongsTo(Pessoa);

Veiculo.sync({force: false});

module.exports = Veiculo;