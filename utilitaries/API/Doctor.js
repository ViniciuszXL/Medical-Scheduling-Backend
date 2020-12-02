const Connection = require('../Connection');

function all(callback) {
    var con = Connection.create();
    var sql = 'SELECT D.name, S.name AS `specialtyName` ' + 
    'FROM `doctor` AS `D` ' +
    'INNER JOIN `specialty` AS `S` ' +
    'ON D.specialty = S.id;';
    con.query(sql, function(err, result) {
        try {
            return callbackResult(err, result, callback);
        } finally {
            con.end();
        }
    });
}

function bySpecialtyId(id, callback) {
    var con = Connection.create();
    var sql = 'SELECT D.name ' + 
    'FROM `doctor` AS `D` ' +
    'INNER JOIN `specialty` AS `S` ' +
    'ON D.specialty = S.id ' +
    'WHERE S.id=?;';
    con.query(sql, [id], function(err, result) {
        try {
            return callbackResult(err, result, callback);
        } finally {
            con.end();
        }
    });
}

function byId(id, callback) {
    var con = Connection.create();
    var sql = 'SELECT * FROM `doctor` WHERE `id`=?;';
    con.query(sql, [ id ], function (err, result) {
        try {
            return callbackResult(err, result, callback);
        } finally {
            con.end();
        }
    });
}

function byName(name, callback) {
    var con = Connection.create();
    var sql = 'SELECT * FROM `doctor` WHERE `name`=?;';
    con.query(sql, [ name ], function (err, result) {
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

module.exports = { all, bySpecialtyId, byName, byId };