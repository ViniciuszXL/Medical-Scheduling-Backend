const clinic = require('../utilitaries/API/Clinic');
const express = require('express');

function isNumber(number) {
    return typeof number === "number";
}

const clinicRoute = express.Router();
clinicRoute.get('/clinics', async (req, res) => {
    var name = req.query.name;
    if (name != null || name != undefined) return clinicByName(res, name);

    var id = parseInt(req.query.id);
    if (!isNaN(id) && isNumber(id)) return clinicById(res, id);

    return allClinics(res);
});

function parseError(res, err, data, isAll) {
    if (err) return res.json([{ 'result': 'error', 'message': err }]);
    if (!data) {
        if (isAll) return res.json([{ 'result': 'error', 'message': 'Não há clínicas cadastradas!' }]);
        return res.json([{ 'result': 'error', 'message': 'Clínica não foi encontrada!' }]);
    }

    return false;
}

function allClinics(res) {
    clinic.clinics(function (err, data) {
        if (parseError(res, err, data, true)) return;
        return res.json(data);
    });
}

function clinicByName(res, name) {
    clinic.clinicByName(name, function (err, data) {
        if (parseError(res, err, data, false)) return;
        return res.json(data);
    });
}

function clinicById(res, id) {
    clinic.clinicById(id, function (err, data) {
        if (parseError(res, err, data, false)) return;
        return res.json(data);
    });
}

module.exports = clinicRoute;