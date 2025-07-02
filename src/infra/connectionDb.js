

const {Sequelize} = require("sequelize");


module.exports = new Sequelize("chave_certa", "root", "chavecerta", {
    host:"localhost",
    dialect: "mysql"
});