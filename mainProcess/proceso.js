const { updateCards, updateToken } = require('../db/query');
const { getToken, getDataCars } = require('../requests/access');

function main(database, data_tpi, listCard) {
    return new Promise(function (resolve, reject) {
        getDataCars(data_tpi, listCard, data_tpi.tpi_token).then(function (dataCard) {
            if (dataCard.statusCode !== 200) {
                getToken(data_tpi).then(function (data) {
                    let token;
                    if (data.statusCode === 200) {
                        token = data.body.token;
                        updateToken(database, data_tpi.id, token);
                        getDataCars(data_tpi, listCard, token).then(function (dataCard) {
                            updateCards(database, dataCard.body.cards).then(function (data) {
                                resolve(data);
                            });
                        });
                    } else {
                        reject("Token invalido");
                    }
                });
            } else {
                updateCards(database, dataCard.body.cards).then(function (data) {
                    resolve(data);
                });
            }
        });
    })
}

module.exports = { main };