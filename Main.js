const http = require('http');
const express = require('express');
const app = express();
app.use(require('cors')());

// Utilitaries //
const connection = require('./utilitaries/Connection');

// Urls //
const Appointment = require('./routes/Appointment');
const Clinics = require('./routes/Clinics');
const Doctor = require('./routes/Doctor');
const Login = require('./routes/Login');
const Register = require('./routes/Register');
const Specialty = require('./routes/Specialty');

const server = http.createServer(app);
server.listen(connection.getPort());
console.log('Servidor inicializado na porta ' + connection.getPort());

// criar as url //
app.use('/', Appointment, Clinics, Doctor, Login, Register, Specialty);

// Banco de Dados //
console.log('Iniciando a criação das tabelas do banco de dados...');

var con = connection.create();
try {
    var sql = 'CREATE TABLE IF NOT EXISTS `clinic`('
        + '`id` INT NOT NULL AUTO_INCREMENT, '
        + '`name` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;';
    con.query(sql, function (err, result) {
        if (err) { console.log(err) } else { console.log('Tabela `clinic` criada com sucesso!') }
    });

    sql = 'CREATE TABLE IF NOT EXISTS `specialty`('
        + '`id` INT NOT NULL AUTO_INCREMENT,'
        + '`name` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;';
    con.query(sql, function (err, result) {
        if (err) { console.log(err) } else { console.log('Tabela `specialty` criada com sucesso!') }
    });

    sql = 'CREATE TABLE IF NOT EXISTS `clinic_specialties`('
        + '`id_clinic` INT NOT NULL,'
        + '`id_specialty` INT NOT NULL,'
        + 'FOREIGN KEY (`id_clinic`) REFERENCES `clinic` (`id`),'
        + 'FOREIGN KEY (`id_specialty`) REFERENCES `specialty` (`id`),'
        + 'PRIMARY KEY (`id_clinic`, `id_specialty`)) ENGINE=InnoDB;';
    con.query(sql, function (err, result) {
        if (err) { console.log(err) } else { console.log('Tabela `clinic_specialties` criada com sucesso!') }
    });

    sql = 'CREATE TABLE IF NOT EXISTS `doctor`('
        + '`id` BIGINT NOT NULL AUTO_INCREMENT,'
        + '`email` VARCHAR(255) NOT NULL UNIQUE,'
        + '`name` VARCHAR(255) NOT NULL,'
        + '`crm` VARCHAR(255) NOT NULL,'
        + '`specialty` INT NOT NULL,'
        + 'FOREIGN KEY (`specialty`) REFERENCES `specialty`(`id`),'
        + 'PRIMARY KEY (`id`)) ENGINE=InnoDB;';
    con.query(sql, function (err, result) {
        if (err) { console.log(err) } else { console.log('Tabela `doctor` criada com sucesso!') }
    });

    sql = 'CREATE TABLE IF NOT EXISTS `user`('
        + '`id` BIGINT NOT NULL AUTO_INCREMENT,'
        + '`email` VARCHAR(255) NOT NULL UNIQUE,'
        + '`name` VARCHAR(255) NOT NULL,'
        + '`cpf` VARCHAR(11) NOT NULL,'
        + '`telefone` VARCHAR(20),'
        + '`password` VARCHAR(255) NOT NULL,'
        + 'PRIMARY KEY (`id`)) ENGINE=InnoDB;';
    con.query(sql, function (err, result) {
        if (err) { console.log(err) } else { console.log('Tabela `user` criada com sucesso!') }
    });

    sql = 'CREATE TABLE IF NOT EXISTS `appointment`('
        + '`id` BIGINT NOT NULL AUTO_INCREMENT,'
        + '`time` TIME NOT NULL,'
        + '`customer_id` BIGINT NOT NULL,'
        + '`doctor_id` BIGINT NOT NULL,'
        + 'FOREIGN KEY (`customer_id`) REFERENCES `user`(`id`),'
        + 'FOREIGN KEY (`doctor_id`) REFERENCES `doctor`(`id`),'
        + 'PRIMARY KEY (`id`)) ENGINE=InnoDB;';
    con.query(sql, function (err, result) {
        if (err) { console.log(err) } else { console.log('Tabela `appointment` criada com sucesso!') }
    });
} finally {
    con.end();
}
