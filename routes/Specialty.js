const specialty = require('../utilitaries/API/Specialty');
const express = require('express');

function isNumber(number) {
    return typeof number === "number";
}

const specialtyRoute = express.Router();
specialtyRoute.get('/specialty', async (req, res) => {
    var id = parseInt(req.query.id);
    if (isNaN(id) || !isNumber(id))
        return res.json([{ 'result': 'error', 'message': 'Por favor, informe o ID da clínica.' }]);

    specialty.clinicSpecialties(id, function(err, data) {
        if (err) return res.json([{ 'result': 'error', 'message': err }]);
        if (!data) return res.json([{ 'result': 'error', 'message': 'Não há especialidades disponíveis para esta clínica!' }]);
        return res.json(data);
    });
});

module.exports = specialtyRoute;