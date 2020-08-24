const app = require('../bin/www');
const supertest = require('supertest');
const server = supertest.agent(app);
const should = require('should');
const messages = require('../helpers/messages');

describe('01 - Auth endpoints', function () {
  it('Sign Up Error - Required Fields', function (done) {
    server
      .post('/api/auth/signup')
      .send({})
      .expect('Content-type',/json/)
      .expect(422)
      .end(function (err, res) {
        res.status.should.equal(422);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('data').eql(null);
        res.body.should.have.property('errors');
        res.body.errors.should.be.an.instanceOf(Array);
        res.body.errors.length.should.be.eql(2);
        res.body.errors[0].should.be.an.instanceOf(Object);
        res.body.errors[0].should.have.property('message').eql(messages.username_required);
        res.body.errors[0].should.have.property('field').eql('username');

        res.body.errors[1].should.be.an.instanceOf(Object);
        res.body.errors[1].should.have.property('message').eql(messages.password_required);
        res.body.errors[1].should.have.property('field').eql('password');
        done();
      });
  });

  it('Sign Up Error - Required Username', function (done) {
    server
      .post('/api/auth/signup')
      .send({
        password: '123'
      })
      .expect('Content-type',/json/)
      .expect(422)
      .end(function (err, res) {
        res.status.should.equal(422);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('data').eql(null);
        res.body.should.have.property('errors');
        res.body.errors.should.be.an.instanceOf(Array);
        res.body.errors.length.should.be.eql(1);
        res.body.errors[0].should.be.an.instanceOf(Object);
        res.body.errors[0].should.have.property('message').eql(messages.username_required);
        res.body.errors[0].should.have.property('field').eql('username');
        done();
      });
  });

  it('Sign Up Error - Required Password', function (done) {
    server
      .post('/api/auth/signup')
      .send({
        username: 'admin'
      })
      .expect('Content-type',/json/)
      .expect(422)
      .end(function (err, res) {
        res.status.should.equal(422);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('data').eql(null);
        res.body.should.have.property('errors');
        res.body.errors.should.be.an.instanceOf(Array);
        res.body.errors.length.should.be.eql(1);
        res.body.errors[0].should.be.an.instanceOf(Object);
        res.body.errors[0].should.have.property('message').eql(messages.password_required);
        res.body.errors[0].should.have.property('field').eql('password');
        done();
      });
  });

  it('Sign Up Success', function (done) {
    server
      .post('/api/auth/signup')
      .send({
        username: 'admin',
        password: 'admin'
      })
      .expect('Content-type',/json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.data.should.be.an.instanceOf(Object);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('username').eql('admin');
        done();
      });
  });

  it('Sign Up Error - Already registered', function (done) {
    server
      .post('/api/auth/signup')
      .send({
        username: 'admin',
        password: 'admin'
      })
      .expect('Content-type',/json/)
      .expect(422)
      .end(function (err, res) {
        res.status.should.equal(422);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('data').eql(null);
        res.body.should.have.property('errors');
        res.body.errors.should.be.an.instanceOf(Array);
        res.body.errors.length.should.be.eql(1);
        res.body.errors[0].should.be.an.instanceOf(Object);
        res.body.errors[0].should.have.property('message').eql(messages.username_used);
        res.body.errors[0].should.have.property('field').eql('username');
        done();
      });
  });

  it('Sign In Error - Invalid Credentials', function (done) {
    server
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'admin1'
      })
      .expect('Content-type',/json/)
      .expect(422)
      .end(function (err, res) {
        res.status.should.equal(422);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('data').eql(null);
        res.body.should.have.property('errors');
        res.body.errors.should.be.an.instanceOf(Array);
        res.body.errors.length.should.be.eql(1);
        res.body.errors[0].should.be.an.instanceOf(Object);
        res.body.errors[0].should.have.property('message').eql(messages.invalid_credentials);
        res.body.errors[0].should.have.property('field').eql(null);
        done();
      });
  });

  it('Sign In Success', function (done) {
    server
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'admin'
      })
      .expect('Content-type',/json/)
      .expect(200)
      .end(function (err, res) {

        global.token = res.body.data.token;

        res.status.should.equal(200);
        res.body.data.should.be.an.instanceOf(Object);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('username').eql('admin');
        done();
      });
  });
});
