const mysql = require('mysql');
function generarConnexion(database){
return mysql.createConnection({
    host: process.env["db_host"],
    port: 3306,
    database: "crm_sarasa",
    // user: "sacoadev",
    // password:"crm$2020",

    user: process.env["db_user"],
    password: process.env["db_pass"],
    multipleStatements: true
  });
};

module.exports = generarConnexion;
  