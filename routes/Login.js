const user = require('../utilitaries/API/User');
const express = require('express');

function validString(string) {
    return string === undefined || string === null || string === '' ? false : true;
}

function isNumber(number) {
    return typeof number === "number";
}

const loginRoute = express.Router();
loginRoute.get('/login', async (req, res) => {
    var cpf = parseInt(req.query.cpf);
    if (isNaN(cpf) || !isNumber(cpf))
        return res.json([{ 'result': 'error', 'message': 'Por favor, informe o CPF corretamente!' }]);

    var password = req.query.password;
    if (!validString(password))
        return res.json([{ 'result': 'error', 'message': 'Por favor, informe a senha corretamente!' }]);

    user.exists(cpf, function (err, data) {
        if (err) return res.json([{ 'result': 'error', 'message': err }]);
        if (!data) return res.json([{ 'result': 'error', 'message': 'CPF informado não está cadastrado!' }]);

        user.login(cpf, password, function (err, data) {
            if (err) return res.json([{ 'result': 'error', 'message': err }]);
            var result = split(data, ';');
            var equals = result[0];
            if (!equals) return res.json([{ 'result': 'error', 'message': 'A senha informada não é igual à cadastrada!' }]);
            
            var name = result[1];
            return res.json([{ 'result': 'success', 'message': 'Login realizado com sucesso!', 'name': name }]);
        });
    });
});

function split(str, separator) {
    var string = str.split(separator);
    return string;
}

module.exports = loginRoute;