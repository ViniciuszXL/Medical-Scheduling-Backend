const user = require('../utilitaries/API/User');
const express = require('express');

function isNumber(number) {
    return typeof number === "number";
}

const appointmentRoute = express.Router();
appointmentRoute.get('/appointment', async (req, res) => {
    var id = parseInt(req.query.id);
    if (isNaN(id) || !isNumber(id))
        return res.json([{ 'result': 'error', 'message': 'ID informado está incorreto!' }]);
    
    user.existsById(id, function(err, result) {
        if (err) return res.json([{ 'result': 'error', 'message': err }]);
        if (!result) return res.json([{ 'result': 'error', 'message': 'Não existe um usuário com esse ID cadastrado.' }]);
        
        user.appointment(id, function(err, result) {
            if (err) return res.json([{ 'result': 'error', 'message': err }]);
            if (!result) return res.json([{ 'result': 'error', 'message': 'Não há consultas marcadas!' }]);
            return res.json(result);
        });
    });
});

module.exports = appointmentRoute;