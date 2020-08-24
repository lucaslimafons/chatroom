const app = require('../bin/www');
const supertest = require('supertest');
const server = supertest.agent(app);
const should = require('should');
const messages = require('../helpers/messages');

describe('02 - User endpoints', function () {
  it('User Error 401 - Get Online Users', function (done) {
    server
      .get('/api/user/online')
      .expect('Content-type',/json/)
      .expect(401)
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });

  it('Sign Up Success', function (done) {
    server
      .get('/api/user/online')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .expect('Content-type',/json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.data.should.be.an.instanceOf(Array);
        res.body.data.length.should.be.eql(0);
        done();
      });
  });
});
