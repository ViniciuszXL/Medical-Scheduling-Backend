const Connection = require('../Connection');

function byId(id, callback) {
    var con = Connection.create();
    var sql = 'SELECT S.name AS specialty ' + 
    'FROM clinic_specialties AS `C` ' + 
    'INNER JOIN `specialty` AS `S` ON C.id_specialty = S.id ' +
    'WHERE `id_clinic`=?;';
    con.query(sql, [id], function (err, result) {
        try {
            return callbackResult(err, result, callback);
        } finally {
            con.end();
        }
    });
}

function byName(specialtyName, callback) {
    var con = Connection.create();
    var sql = 'SELECT `id` FROM `specialty` WHERE `name`=?;';
    con.query(sql, [specialtyName], function (err, result) {
        try {
            return callbackResult(err, result, callback);
        } finally {
            con.end();
        }
    });
}

function callbackResult(err, result, callback) {
    if (err) return callback(err, null);
    var rows = result.length;
    return callback(null, rows < 1 ? false : result);
}

module.exports = { byId, byName };