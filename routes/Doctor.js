const doctor = require('../utilitaries/API/Doctor');
const express = require('express');

function isNumber(number) {
    return typeof number === "number";
}

const doctorRoute = express.Router();
doctorRoute.get('/doctors', async (req, res) => {
    var specialtyId = parseInt(req.query.specialtyId);
    if (isNumber(specialtyId) && !isNaN(specialtyId)) return getBySpecialty(specialtyId, res);

    var doctorId = parseInt(req.query.doctorId);
    if (isNumber(doctorId) && !isNaN(doctorId)) return getById(doctorId, res);

    doctor.all(function (err, data) {
        if (parseError(err, data, res)) return;
        return res.json(data);
    });
});

function getById(id, res) {
    doctor.byId(id, function (err, data) {
        if (parseError(err, data, res)) return;
        return res.json(data);
    });
}

function getBySpecialty(id, res) {
    doctor.bySpecialtyId(id, function (err, data) {
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