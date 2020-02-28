const server = require('../api/server')
const request = require('supertest')


describe('GET /api/auth', () => {
  it('returns 200', (done) => {
    return request(server).get('/api/users')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })
})

describe('Verify Login is functioning', () => {
  let goodLogin = {
    userName: 'testUser',
    password: 'password',
  }

  let badLogin = {
    userName: 'invalidUser',
    password: 'wrongPass'
  }
  it('responds with 201 created', () => {
    return request(server)
    .post('/api/auth/login')
    .send(goodLogin)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)

  })
  it('responds with 401 unauthorized on failed login', () => {
    return request(server)
    .post('/api/auth/login')
    .send(badLogin)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)

  })
})
