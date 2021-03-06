const user = require('../utilitaries/API/User');
const express = require('express');
const { encrypt } = require('../utilitaries/Crypto');

function validString(string) {
    return string === undefined || string === null || string === '' ? false : true;
}

function isNumber(number) {
    return typeof number === "number";
}

const registerRoute = express.Router();
registerRoute.post('/register', async (req, res) => {
    var name = req.query.name;
    if (!validString(name))
        return res.json([{ 'result': 'error', 'message': 'Por favor, informe o nome corretamente!' }]);

    var email = req.query.email;
    if (!validString(email))
        return res.json([{ 'result': 'error', 'message': 'Por favor, informe o email corretamente!' }]);

    var cpf = parseInt(req.query.cpf);
    if (isNaN(cpf) || !isNumber(cpf))
        return res.json([{ 'result': 'error', 'message': 'Por favor, informe o CPF corretamente!' }]);

    var password = req.query.password;
    if (!validString(password))
        return res.json([{ 'result': 'error', 'message': 'Por favor, informe a senha corretamente!' }]);

    console.log('Registering '+name+' values ['+email+','+cpf+'];');
    console.log('Checking if there is a user registered with the same cpf in the database');
    user.exists(cpf, function (err, data) {
        if (err) return res.json([{ 'result': 'error', 'message': err }]);
        if (data) return res.json([{ 'result': 'error', 'message': 'Esse CPF já foi cadastrado!' }]);

        console.log('Result returns a empty! Creating new user...');
        var passwordEncrypted = encrypt(password);
        user.create(email, name, cpf, passwordEncrypted, function (err, data) {
            if (err) return res.json([{ 'result': 'error', 'message': err }]);
            if (!data) return res.json([{ 'result': 'error', 'message': 'Ocorreu um erro ao registrar seus dados.' }]);
            return res.json([{ 'result': 'success', 'message': 'Usuário cadastrado com sucesso!' }]);
        });
    });
});

module.exports = registerRoute;