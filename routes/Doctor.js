const doctor = require('../utilitaries/API/Doctor');
const express = require('express');
const { getBySpecialtyId } = require('../utilitaries/API/Doctor');

function isNumber(number) {
    return typeof number === "number";
}

const doctorRoute = express.Router();
doctorRoute.get('/doctors', async (req, res) => {
    var id = parseInt(req.query.specialtyId);
    if (isNumber(id) && !isNaN(id)) return getBySpecialty(id, res);

    doctor.get(function (err, data) {
        if (parseError(err, data, res)) return;
        return res.json(data);
    });
});

function getBySpecialty(id, res) {
    doctor.getBySpecialtyId(id, function (err, data) {
        if (parseError(err, data, res)) return;
        return res.json(data);
    });
}

function parseError(err, data, res) {
    if (err) return res.json([{ 'result': 'error', 'message': err }]);
    if (!data) return res.json([{ 'result': 'error', 'message': 'Não há doutores cadastrados!' }]);
    return false;
}

module.exports = doctorRoute;