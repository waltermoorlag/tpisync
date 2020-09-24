function ajustar(tam, num) {
    tam = tam - 1;
    if (num.toString().length <= tam) return ajustar(tam, "0" + num)
    else return num;
}

function obtenerStringHora() {
    var dateNow = new Date();
    var dateUTC = new Date(dateNow.getUTCFullYear(), dateNow.getUTCMonth(), dateNow.getUTCDate(), dateNow.getUTCHours(), dateNow.getUTCMinutes(), dateNow.getUTCSeconds())
    var tz = -3;
    var seconds = (tz * 60 * 60) * 1000;
    dateUTC.setTime(dateUTC.getTime() + seconds);
    var fechayhora = dateUTC;
    var stringHora = fechayhora.getFullYear() + "-" + ajustar(2, (fechayhora.getMonth() + 1)) + "-" + ajustar(2, fechayhora.getDate()) + ' ' + ajustar(2, fechayhora.getHours()) + ':' + ajustar(2, fechayhora.getMinutes()) + ':' + ajustar(2, fechayhora.getSeconds());
    return stringHora;
}


function updateToken(database, idLocation, token) {
    return new Promise(function (resolve, reject) {
        const db = require('./connect')(database);
        let datenow = obtenerStringHora();
        db.connect();
        db.query('UPDATE `' + database + '`.`crm_locations` SET tpi_token = "' + token + '", tpi_tokendate = "' + datenow + '"  WHERE id= ' + idLocation + ';', function (error, results, fields) {
            if (error) reject(error);
            db.end();
            resolve(results);
        });
    });
}

function updateCards(database, cards) {
    return new Promise(function (resolve, reject) {
        const db = require('./connect')(database);
        let datenow = obtenerStringHora();
        let sente = "";
        for (let i = 0; i < cards.length; i++) {
            sente += 'UPDATE `' + database + '`.`crm_cards` SET ';
            sente += 'tpi_credits = ' + cards[i].credits + ', ';
            sente += 'tpi_bonus = ' + cards[i].bonus + ', ';
            sente += 'tpi_courtesy = ' + cards[i].courtesy + ', ';
            sente += 'tpi_status = "' + cards[i].status + '", ';
            sente += 'tpi_tickets = ' + cards[i].tickets + ', ';
            sente += 'tpi_childflag = ' + cards[i].childflag + ', ';
            sente += 'tpi_total_cred_played = ' + cards[i].totalCredPlayed + ', ';
            sente += 'tpi_last_play = "' + cards[i].lastPlay + '", ';
            sente += 'tpi_last_buy = "' + cards[i].lastBuy + '", ';
            sente += 'tpi_last_update = "' + datenow + '", ';
            sente += 'tpi_flag = 1';
            sente += ' WHERE cardnumber = ' + cards[i].cardNumber + ';';
        }
        db.connect();
        db.query(sente, function (error, results, fields) {
            if (error) reject(error);
            db.end();
            resolve(results.length);
        });
    });
}
module.exports = { updateToken, updateCards };