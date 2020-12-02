const user = require('../utilitaries/API/User');
const express = require('express');

function validString(string) {
    return string === undefined || string === null || string === '' ? false : true;
}

const userRoute = express.Router();
userRoute.get('/user', async (req, res) => {
    var name = req.query.name;
    if (!validString(name))
        return res.json([{ 'result': 'error', 'message': 'Por favor, informe o nome do usuário corretamente!' }]);

    user.getByName(name, function (err, data) {
        if (err) return res.json([{ 'result': 'error', 'message': err }]);
        if (!data) return res.json([{ 'result': 'error', 'message': 'Não há um usuário cadastrado com este nome!' }]);
        return res.json(data);
    });
});

module.exports = userRoute;