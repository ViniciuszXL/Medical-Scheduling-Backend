const Connection = require('../Connection');
const { decrypt } = require('../Crypto');

function exists(cpf, callback) {
    var con = Connection.create();
    con.query('SELECT * FROM `user` WHERE `cpf`=?;', [cpf], function (err, result) {
        try {
            if (err) return callback(err, null);

            var rows = result.length;
            return callback(null, rows > 0 ? true : false);
        } finally {
            con.end();
        }
    });
}

function existsById(id, callback) {
    var con = Connection.create();
    con.query('SELECT * FROM `user` WHERE `id`=?;', [id], function (err, result) {
        try {
            if (err) return callback(err, null);
            var rows = result.length;
            return callback(null, rows > 0 ? true : false);
        } finally {
            con.end();
        }
    });
}

function create(email, name, cpf, password, callback) {
    var con = Connection.create();
    var sql = 'INSERT INTO `user` (`email`, `name`, `cpf`, `password`) VALUES (?, ?, ?, ?);';
    con.query(sql, [email, name, cpf, password], function (err, result) {
        try {
            return callback(err ? err : null, err ? null : true);
        } finally {
            con.end();
        }
    });
}

function login(cpf, password, callback) {
    var con = Connection.create();
    var sql = 'SELECT * FROM `user` WHERE `cpf`=?';
    con.query(sql, [cpf], function (err, result) {
        try {
            if (err) return callback(err, null);

            var data = result[0];
            var name = data.name;
            var passwordSplit = data.password.split(';');
            var passwordDecrypted = decrypt(passwordSplit[0], passwordSplit[1]);
            var str = (password === passwordDecrypted) + ";" + name;
            return callback(null, str);
        } finally {
            con.end();
        }
    });
}

function getByName(name, callback) {
    var con = Connection.create();
    var sql = 'SELECT `id`, `name`, `cpf` FROM `user` WHERE `name`=?;';
    con.query(sql, [ name ], function(err, result) {
        try {
            if (err) return callback(err, null);

            var rows = result.length;
            return callback(null, rows < 1 ? false : result);
        } finally {
            con.end();
        }
    });
}

// APPOINTMENT //
function appointment(id, callback) {
    var con = Connection.create();
    var sql = 'SELECT * FROM `appointment` WHERE `customer_id`=? ORDER BY (`time`) ASC;';
    con.query(sql, [ id ], function(err, result) {
        try {
            if (err) return callback(err, null);

            var rows = result.length;
            return callback(null, rows < 1 ? false : result);
        } finally {
            con.end();
        }
    });
}

function existsAppointment(specialtyId, callback) {
    var con = Connection.create();
    var sql = "SELECT * FROM `appointment` WHERE `specialty_id`=?";
    con.query(sql, [ specialtyId ], function (err, result) {
        try {
            if (err) return callback(err, null);

            var rows = result.length;
            return callback(null, rows < 1 ? false : result);
        } finally {
            con.end();
        }
    });
}

function markAppointment(time, clinicId, userId, doctorId, specialtyId, callback) {
    var con = Connection.create();
    var sql = "INSERT INTO `appointment` VALUES (NULL, ?, ?, ?, ?, ?);";
    con.query(sql, [ time, clinicId, userId, doctorId, specialtyId ], function (err, result) {
        try {
            return callback(err ? err : null, err ? null : true);
        } finally {
            con.end();
        }
    });
}

module.exports = { exists, existsById, create, login, getByName, appointment, existsAppointment, markAppointment };