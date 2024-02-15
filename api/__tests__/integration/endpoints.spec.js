const request = require('supertest')
const app = require('../../app')
const { resetTestDB } = require('./config')

describe('api server', () => {
    let api
  
    beforeEach(async () => {
      await resetTestDB()
    })
  
    beforeAll(() => {
      api = app.listen(4000, () => {
        console.log('Test server running on port 4000')
      })
    })
  
    afterAll((done) => {
      api.close(done)
    })

    it('GET /', (done) => {
        request(api).get('/').expect(200, done)
    })
})