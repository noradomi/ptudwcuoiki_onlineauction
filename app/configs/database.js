const mysql = require('mysql');

exports.createConnection = function createConnnection() {
    return mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456789',
        database: 'mydb'
    });
};

exports.load = sql => {
    return new Promise((resole, reject) => {
        const con = createConnnection();
        con.connect(err => {
            if (err) {
                reject(err);
            }
        });
        con.query(sql, (error, result, fields) => {
            if (error) {
                reject(error);
            }
            resole(result);
        });
        con.end();
    });
};