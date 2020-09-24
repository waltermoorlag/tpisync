
const https = require('https')
const axios = require('axios');

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

async function getToken(data_tpi) {
    try {
        const response = await instance.post(`${data_tpi.endpoint}/login`,
            {
                user: data_tpi.tpi_username,
                pass: data_tpi.tpi_password,
                computerId: 1
            },
        );
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}

async function getDataCars(data_tpi, listCard, token) {
    try {
        const response = await instance.post(`${data_tpi.endpoint}/card/balanceBatch`,
            {
                posId: 1,
                empId: eval(data_tpi.tpi_empid),
                cards: listCard,
                token: token
            }
        );
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}

module.exports = {getToken, getDataCars};