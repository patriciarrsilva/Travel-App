const app = require('../server/server');
const supertest = require('supertest');
const request = supertest(app);

it('Gets the all endpoint', async () => {
  const response = await request.get('/all');
  expect(response.status).toBe(200);
});
