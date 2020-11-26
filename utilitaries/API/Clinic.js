const Connection = require('../Connection');

function clinics(callback) {
    var con = Connection.create();
    var sql = 'SELECT name FROM `clinic`';
    con.query(sql, function (err, result) {
        try {
            return callbackResult(err, result, callback);
        } finally {
            con.end();
        }
    });
}

function clinicById(id, callback) {
    var con = Connection.create();
    var sql = 'SELECT name FROM `clinic` WHERE `id`=?;';
    con.query(sql, [ id ], function(err, result) {
        try {
            return callbackResult(err, result, callback);
        } finally {
            con.end();
        }
    });
}

function clinicByName(name, callback) {
    var con = Connection.create();
    var sql = 'SELECT `id` FROM `clinic` WHERE `name`=?;';
    con.query(sql, [ name ], function(err, result) {
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

module.exports = { clinics, clinicByName, clinicById };