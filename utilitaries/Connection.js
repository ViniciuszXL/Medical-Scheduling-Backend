const mysql = require('mysql');

const hostname = 'localhost';
const port = '3306';
const username = 'root';
const pass = '';
const db = 'medical-scheduling';

const backendURL = 'http://localhost';
const backendPort = '9090';

function getPort() {
    return backendPort;
}

function getUri() {
    return backendURL + ":" + backendPort + "/";
}

function getUserExists(cpf) {
    return getUri() + 'userExists?cpf=' + cpf;
}

function create() {
    const connection = mysql.createConnection(
        {
            host: hostname,
            port: port,
            user: username,
            password: pass,
            database: db
        }
    );

    return connection;
}

module.exports = { getPort, create, getUri, getUserExists }; 