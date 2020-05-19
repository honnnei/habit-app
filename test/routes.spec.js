process.env.NODE_ENV = "test"
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const {MongoClient} = require("mongodb")

const should = chai.should();

chai.use(chaiHttp);

describe('API Routes', function() {
    let db, testCollection
    before(function(done){
      MongoClient.connect("mongodb://localhost/HabitTracker", { useUnifiedTopology: true })
      .then(dbAPI => {
          console.log('Connected to Database')
          const db = dbAPI.db("HabitTracker")
          testCollection = db.collection('testing')
          testCollection.insertOne({"username":"Tester","habit":[{"habitName":"Drink more water","date":"2020-05-18","frequency":8,"tracking":[true]}]})

    })
    done()
  })

    after(function(done) {
        db.testCollection.remove()
        done()
    }); 

  describe('GET a users habits', function() {
    it('should return all habits of a user', function(done) {
      chai.request(server)
      .get('/habits/Tester')
      .end(function(err, res) {
      console.log(res.body)
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.length.should.equal(1);
      done();
      });
    });
  })

/*   describe('POST /habits/add-user', function() {
    it('should add a show', function(done) {
      chai.request(server)
      .post('/shows/show')
      .send({
        username: 'Tester2'
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('Family Guy');
        res.body.should.have.property('channel');
        res.body.channel.should.equal('Fox');
        res.body.should.have.property('genre');
        res.body.genre.should.equal('Comedy');
        res.body.should.have.property('rating');
        res.body.rating.should.equal(4);
        res.body.should.have.property('explicit');
        res.body.explicit.should.equal(true);
        done();
      });
    });
  }); */
});

