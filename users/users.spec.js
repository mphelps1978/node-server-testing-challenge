const server = require('../api/server')
const request = require('supertest')


describe('GET /api/users', () => {
  it('returns 200', (done) => {
    return request(server).get('/api/users')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })
})

describe('POST /api/users', () => {
  let goodRequest = {
    userName: 'testUser',
    password: 'password',
    department: 'sales'
  }

  let badRequest = {
    userName: 'testUser',
    department: 'sales'
  }
  it('responds with 201 created', () => {
    return request(server)
    .post('/api/users')
    .send(goodRequest)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)

  })
  it('responds with 400 bad request on invalid data', () => {
    return request(server)
    .post('/api/users')
    .send(badRequest)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400)

  })
})

