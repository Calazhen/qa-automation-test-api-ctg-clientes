const { spec } = require('pactum');
const testData = require('./testData');

const baseURL = 'http://localhost:8080';

describe('empty spec', () => {

    beforeEach(async () => {
        await spec()
            .delete(`${baseURL}/cliente/apagaTodos`)
            .expectStatus(200);
    });

    it('GET an specific Customer', async () => {
        const customerData = testData.customers['11'];
        await spec()
            .post(`${baseURL}/cliente`)
            .withJson(customerData)
            .expectStatus(201);

        await spec()
            .get(`${baseURL}/cliente/11`)
            .expectStatus(200)
            .expectJson(customerData);
    });

    it('GET all customers', async () => {
        const customerData11 = testData.customers['11']; 
        const customerData13 = testData.customers['13'];

        await spec()
            .post(`${baseURL}/cliente`)
            .withJson(customerData11)
            .expectStatus(201);

        await spec()
            .post(`${baseURL}/cliente`)
            .withJson(customerData13)
            .expectStatus(201);

        await spec()
            .get(`${baseURL}/`)
            .expectStatus(200)
            .expectJson({
                '11': customerData11,
                '13': customerData13
            });
    });
});
