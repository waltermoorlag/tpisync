const { main } = require('./mainProcess/proceso.js');
const { validate } = require('./mainProcess/validate.js');

exports.handler = async (event) => {
    const promise = new Promise(function (resolve, reject) {
        event.Records.forEach(record => {
            const { body } = record;
            const listCard = body.cards;
            const data_tpi = body.tpi;
            const database = body.database;
            try {
                const resultValidate = validate();
                if (resultValidate.ok) {
                    main(database, data_tpi, listCard).then(data => {
                        resolve(data);
                    });
                } else {
                    reject(resultValidate.dataError)
                }
            } catch (error) {
                reject(error);
            }
        });
    });
    return promise;
};