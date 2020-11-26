const user = require('../../utilitaries/API/User');
const clinic = require('../../utilitaries/API/Clinic');
const specialty = require('../../utilitaries/API/Specialty');
const doctor = require('../../utilitaries/API/Doctor');
const express = require('express');

function isNumber(number) {
    return typeof number === "number";
}

function isNull(variable) {
    return variable == null || variable == undefined;
}

// ID, TIME, CLINIC_ID, CUSTOMER_ID (USER_ID), DOCTOR_ID, SPECIALTY_ID //
// id = id único
// time = dia da consulta
// clinic_id = ID da clínica
// customer_id = ID do usuário
// doctor_id = ID do doutor
// specialty_id = ID da especialidade
const markAppointmentRoute = express.Router();
markAppointmentRoute.put('/markappointment', async (req, res) => {
    var time = req.query.time;
    if (isNull(time))
        return res.json([{ 'result': 'error', 'message': 'Informe a data da consulta!' }]);

    var clinicName = req.query.clinicName;
    if (isNull(clinicName))
        return res.json([{ 'result': 'error', 'message': 'Informe o nome da clinica!' }]);
    
    clinic.clinicByName(clinicName, function (err, data) {
        if (err) return res.json([{ 'result': 'error', 'message': err }]);
        if (!data) return res.json([{ 'result': 'error', 'message': 'Não foi possível encontrar o nome da clínica!' }]);
        var clinicId = data[0]['id'];

        var userName = req.query.userName;
        if (isNull(userName))
            return res.json([{ 'result': 'error', 'message': 'Informe o nome do usuário!' }]);
        
        user.getByName(userName, function (err, data) {
            if (err) return res.json([{ 'result': 'error', 'message': err }]);
            if (!data) return res.json([{ 'result': 'error', 'message': 'Não foi possível buscar o usuário!' }]);
            var userId = data[0]['id'];

            var doctorName = req.query.doctorName;
            if (isNull(doctorName))
                return res.json([{ 'result': 'error', 'message': 'Informe o nome do doutor!' }]);

            doctor.getByName(doctorName, function (err, data) {
                if (err) return res.json([{ 'result': 'error', 'message': err }]);
                if (!data) return res.json([{ 'result': 'error', 'message': 'Não foi possível buscar o doutor!' }]);
                var doctorId = data[0]['id'];
                var specialtyId = data[0]['specialty'];

                user.markAppointment(time, clinicId, userId, doctorId, specialtyId, function (err, data) {
                    if (err) return res.json([{ 'result': 'error', 'message': err }]);
                    return res.json([{ 'result': 'success', 'message': 'Consulta para dia ' + time + ' marcado com sucesso!' }])
                });
            });
        });
    });
});

module.exports = markAppointmentRoute;