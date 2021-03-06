process.env.NODE_ENV = "test"
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const {MongoClient} = require("mongodb")

const should = chai.should();

chai.use(chaiHttp);

describe('Server-level API testing suite', function() {
  let db, testCollection
  before(function(done){
    MongoClient.connect("mongodb://localhost/HabitTracker", { useUnifiedTopology: true })
    .then(dbAPI => {
        const db = dbAPI.db("HabitTracker")
        testCollection = db.collection('testing')
    })
    done()
  })

  after(function(done) {
      testCollection.remove();
      done();
  });
  //Add a new user
  describe("Add a new user HTTP request - type: POST, route: '/habits/add-user'", function() {
    it('Succeeds', function(done) {
      chai.request(server)
      .post('/habits/add-user')
      .type('json')
      .send({
        "username": "tester"
      })
      .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.string;
      done();
      });
    });
  });
  //Add a new user - "The requested user already exists"
  describe("Add a new user HTTP request - type: POST, route: '/habits/add-user'", function() {
    it("The requested user already exists", function(done) {
      chai.request(server)
      .post('/habits/add-user')
      .type('json')
      .send({
        "username": "tester"
      })
      .end(function(err, res) {
      res.should.have.status(400);
      res.should.be.string;
      done();
      });
    });
  });
  //Get a single user
  describe("Get a single user HTTP request - type: GET, route: '/habits/tester'", function() {
    it('Returns a user document', function(done) {
      chai.request(server)
      .get('/habits/tester')
      .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      done();
      });
    });
  });
  //Get a single user - "The requested user does not exist"
  describe("Get a single user HTTP request - type: GET, route: '/habits/tester!'", function() {
    it("The requested user does not exist", function(done) {
      chai.request(server)
      .get('/habits/tester!')
      .end(function(err, res) {
      res.should.have.status(400);
      res.should.be.string;
      done();
      });
    });
  });
  //Add a new habit to a user
  describe("Add a new habit to a user HTTP request - type: PUT, route: '/habits/add-habit/tester'", function() {
    it('Succeeds', function(done) {
      chai.request(server)
      .put('/habits/add-habit/tester')
      .type('json')
      .send({
        "habitName": "Weed",
        "date": "2020-05-18",
        "frequency": 2,
        "tracking": [false, false]
      })
      .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.string;
      done();
      });
    });
  });
  //Add a new habit to a user - "The requested user does not exist"
  describe("Add a new habit to a user HTTP request - type: PUT, route: '/habits/add-habit/tester!'", function() {
    it("The requested user does not exist", function(done) {
      chai.request(server)
      .put('/habits/add-habit/tester!')
      .type('json')
      .send({
        "habitName": "Weed",
        "date": "2020-05-18",
        "frequency": 2,
        "tracking": [false, false]
      })
      .end(function(err, res) {
      res.should.have.status(400);
      res.should.be.string;
      done();
      });
    });
  });
  //Update a tracking field
  describe("Update a tracking field HTTP request - type: PUT, route: '/habits/update-habit/tester/0/0/true'", function() {
    it('Succeeds', function(done) {
      chai.request(server)
      .put('/habits/update-habit/tester/0/0/true')
      .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.string;
      done();
      });
    });
  });
  //Update a tracking field - "The requested user does not exist"
  describe("Update a tracking field HTTP request - type: PUT, route: '/habits/update-habit/tester!/0/0/true'", function() {
    it("The requested user does not exist", function(done) {
      chai.request(server)
      .put('/habits/update-habit/tester!/0/0/true')
      .end(function(err, res) {
      res.should.have.status(400);
      res.should.be.string;
      done();
      });
    });
  });
  //Update a tracking field - "The requested habit does not exist"
  describe("Update a tracking field HTTP request - type: PUT, route: '/habits/update-habit/tester/100/0/true'", function() {
    it("The requested habit does not exist", function(done) {
      chai.request(server)
      .put('/habits/update-habit/tester/100/0/true')
      .end(function(err, res) {
      res.should.have.status(400);
      res.should.be.string;
      done();
      });
    });
  });
  //Update a tracking field - "The requested tracking field does not exist"
  describe("Update a tracking field HTTP request - type: PUT, route: '/habits/update-habit/tester/0/100/true'", function() {
    it("The requested tracking field does not exist", function(done) {
      chai.request(server)
      .put('/habits/update-habit/tester/0/100/true')
      .end(function(err, res) {
      res.should.have.status(400);
      res.should.be.string;
      done();
      });
    });
  });
  //Update a tracking field - "The requested tracking field value is not 'true' or 'false'"
  describe("Update a tracking field HTTP request - type: PUT, route: '/habits/update-habit/tester/0/0/1'", function() {
    it("The requested tracking field value is not 'true' or 'false'", function(done) {
      chai.request(server)
      .put('/habits/update-habit/tester/0/0/1')
      .end(function(err, res) {
      res.should.have.status(400);
      res.should.be.string;
      done();
      });
    });
  });
  //Delete a habit of a user
  describe("Delete a habit of a user HTTP request - type: PUT, route: '/habits/delete-habit/tester/0'", function() {
    it('Succeeds', function(done) {
      chai.request(server)
      .put('/habits/delete-habit/tester/0')
      .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.string;
      done();
      });
    });
  });
  //Delete a habit of a user - "The requested user does not exist"
  describe("Delete a habit of a user HTTP request - type: PUT, route: '/habits/delete-habit/tester!/0'", function() {
    it("The requested user does not exist", function(done) {
      chai.request(server)
      .put('/habits/delete-habit/tester!/0')
      .end(function(err, res) {
      res.should.have.status(400);
      res.should.be.string;
      done();
      });
    });
  });
  //Delete a habit of a user - "The requested habit does not exist"
  describe("Delete a habit of a user HTTP request - type: PUT, route: '/habits/delete-habit/tester/100'", function() {
    it("The requested habit does not exist", function(done) {
      chai.request(server)
      .put('/habits/delete-habit/tester/100')
      .end(function(err, res) {
      res.should.have.status(400);
      res.should.be.string;
      done();
      });
    });
  });
  //Delete a user - "The requested user does not exist"
  describe("Delete a user HTTP request - type: DELETE, route: '/habits/delete-user/tester!'", function() {
    it("The requested user does not exist", function(done) {
      chai.request(server)
      .delete('/habits/delete-user/tester!')
      .end(function(err, res) {
      res.should.have.status(400);
      res.should.be.string;
      done();
      });
    });
  });
  //Delete a user
  describe("Delete a user HTTP request - type: DELETE, route: '/habits/delete-user/tester'", function() {
    it('Succeeds', function(done) {
      chai.request(server)
      .delete('/habits/delete-user/tester')
      .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.string;
      done();
      });
    });
  });
});

