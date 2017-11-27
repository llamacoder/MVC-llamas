const app = require('../app')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

describe('Llamas Resources', function() {
  describe('POST /', function() {
    it('should create a llama', function(done) {
      const llama = {
        name: 'Mikasa',
        color: 'gray',
        sire: 'Top Flight',
        dam: "Gabby"
      }
      chai.request(app)
        .post('/llamas')
        .send(llama)
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.id).to.be.ok
          expect(res.body.data.name).to.equal(llama.name)
          expect(res.body.data.color).to.equal(llama.color)
          expect(res.body.data.sire).to.equal(llama.sire)
          expect(res.body.data.dam).to.equal(llama.dam)
          done()
        })
    })

    it('should return an error if name is missing', function(done) {
      const llama = {
        color: 'gray',
        sire: 'Top Flight',
        dam: 'Gabby'
      }
      chai.request(app)
        .post('/llamas')
        .send(llama)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })

    it('should return an error if color is missing', function(done) {
      const llama = {
        name: 'Mikasa',
        sire: 'Top Flight',
        dam: "Gabby"
      }
      chai.request(app)
        .post('/llamas')
        .send(llama)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })


    it('should return an error if sire is missing', function(done) {
      const llama = {
        name: 'Mikasa',
        color: 'gray',
        dam: "Gabby"
      }
      chai.request(app)
        .post('/llamas')
        .send(llama)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })

    it('should return an error if dam is missing', function(done) {
      const llama = {
        name: 'Mikasa',
        color: 'gray',
        sire: 'Top Flight'
      }
      chai.request(app)
        .post('/llamas')
        .send(llama)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })
})

describe('GET /', function() {
  it('should retrieve a list of all the llamas', function(done) {
    chai.request(app)
      .get('/llamas')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.be.an('array')

        const llama = res.body.data[0]
        expect(llama).to.be.an('object')
        expect(llama.id).to.be.ok
        done()
      })
  })
})

describe('GET /:id', function() {
  it('should retrieve the single llama specified', function(done) {
    chai.request(app)
      .get('/llamas')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.be.an('array')

        const llama = res.body.data[0]
        chai.request(app)
          .get(`/llamas/${llama.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.data).to.be.an('object')

            expect(res.body.data.id).to.equal(llama.id)
            done()
          })
      })
  })

  it('should return an error if the id does not match a llama', function(done) {
    chai.request(app)
      .get('/llamas/999')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        expect(res.body.error).to.be.an('object')
        expect(res.body.error.message).to.be.ok
        done()
      })
  })
})

describe('PUT /:id', function() {
  it('should update an existing llama when all information is provided', function(done) {
    chai.request(app)
      .get('/llamas')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.be.an('array')

        const llama = res.body.data[0]
        const newInfo = {
          name: 'Independence',
          color: 'white',
          sire: 'Macho Camacho',
          dam: 'Canta Libre'
        }
        chai.request(app)
          .put(`/llamas/${llama.id}`)
          .send(newInfo)
          .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.data).to.be.an('object')
            expect(res.body.data.id).to.be.ok
            expect(res.body.data.name).to.equal(newInfo.name)
            expect(res.body.data.color).to.equal(newInfo.color)
            expect(res.body.data.sire).to.equal(newInfo.sire)
            expect(res.body.data.dam).to.equal(newInfo.dam)
            done()
          })
      })

  })

  it('should return an error if name is missing', function(done) {
    chai.request(app)
      .get('/llamas')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.be.an('array')

        const llama = res.body.data[0]
        const newInfo = {
          color: 'black'
        }
        chai.request(app)
          .put(`/llamas/${llama.id}`)
          .send(newInfo)
          .end((err, res) => {
            expect(res.status).to.equal(400)
            expect(res.body.error).to.be.an('object')
            expect(res.body.error.message).to.be.ok
            done()
          })
      })
  })

  it('should return an error if color is missing', function(done) {
    chai.request(app)
      .get('/llamas')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.be.an('array')

        const llama = res.body.data[0]
        const newInfo = {
          name: 'Independence'
        }
        chai.request(app)
          .put(`/llamas/${llama.id}`)
          .send(newInfo)
          .end((err, res) => {
            expect(res.status).to.equal(400)
            expect(res.body.error).to.be.an('object')
            expect(res.body.error.message).to.be.ok
            done()
          })
      })
  })
})

describe('DELETE /:id', function() {
  it('should remove the specified llama', function(done) {
    chai.request(app)
      .get('/llamas')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.be.an('array')

        const llama = res.body.data[0]
        chai.request(app)
          .delete(`/llamas/${llama.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(204)
            chai.request(app)
              .get(`/llamas/${llama.id}`)
              .end((err, res) => {
                expect(res.status).to.equal(404)
                done()
              })
          })
      })
  })


  it('should return an error if the id is not found', function(done) {
    chai.request(app)
      .delete('/llamas/999')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        expect(res.body.error).to.be.an('object')
        expect(res.body.error.message).to.be.ok
        done()
      })
  })
})
