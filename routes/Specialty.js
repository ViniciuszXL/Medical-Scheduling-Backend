const specialty = require('../utilitaries/API/Specialty');
const clinic = require('../utilitaries/API/Clinic');
const express = require('express');

function isNumber(number) {
    return typeof number === "number";
}

const specialtyRoute = express.Router();
specialtyRoute.get('/specialty', async (req, res) => {
    var specialtyName = req.query.specialtyName;
    if (specialtyName != null || specialtyName != undefined)
        return searchSpecialtyByName(res, specialtyName);

    var specialtyId = parseInt(req.query.specialtyId);
    if (isNumber(specialtyId) && !isNaN(specialtyId))
        return searchSpecialtyById(res, specialtyId);

    var clinicId = parseInt(req.query.clinicId);
    if (isNaN(clinicId) || !isNumber(clinicId))
        return res.json([{ 'result': 'error', 'message': 'Por favor, informe o ID da clínica.' }]);

    specialty.byClinicId(clinicId, function(err, data) {
        if (err) return res.json([{ 'result': 'error', 'message': err }]);
        if (!data) return res.json([{ 'result': 'error', 'message': 'Não há especialidades disponíveis para esta clínica!' }]);
        return res.json(data);
    });
});

function searchSpecialtyByName(res, specialtyName) {
    specialty.byName(specialtyName, function (err, data) {
        if (err) return res.json([{ 'result': 'error', 'message': err }]);
        if (!data) return res.json([{ 'result': 'error', 'message': 'Não foi possível encontrar esta especialidade.' }]);
        return res.json(data);
    });
}

function searchSpecialtyById(res, specialtyId) {
    specialty.byId(specialtyId, function (err, data) {
        if (err) return res.json([{ 'result': 'error', 'message': err }]);
        if (!data) return res.json([{ 'result': 'error', 'message': 'Não foi possível encontrar esta especialidade.' }]);
        return res.json(data);
    });
}

module.exports = specialtyRoute;