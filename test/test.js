/**
 * Created by corentin on 18/07/17.
 */
const assert = require('assert');
const describe = require("mocha").describe;
const it = require("mocha").it;
const http = require("chai-http"),
chai =require('chai'),
app = require("../app");

process.env.NODE_ENV = 'test';

theUser = {
    username: "theUsername",
    name : "theName",
    surname : "theSurname",
    email: "theEmail@theWebmail.theDomain",
    password : "thePassword"
};



chai.use(http);
describe('/users', function() {
    it('should post a user named theUsername on  /users POST', function(done) {
        console.log("arlabichour" + process.env.NODE_ENV);
        chai.request(app)
            .post('/users')
            .send(theUser)
            .end(function(err, res){
                assert(res.status=200, "status not 200");
                assert(res.body.username === theUser.username);
                done();
            });
    });
    it('should list ALL users on /users GET', function(done) {
        chai.request(app)
            .get('/users')
            .end(function(err, res){
                assert(res.status=200);
                assert(Array.isArray(res.body));
                done();
            });
    });
    it('should list ALL users on /users GET', function(done) {
        chai.request(app)
            .get('/users')
            .end(function(err, res){
                assert(res.status=200);
                assert(Array.isArray(res.body));
                // res.should.be.json;
                // res.body.should.be.a('array');
                done();
            });
    });
    it('should get the user theUsername on /users/theUsername GET', function(done) {
        chai.request(app)
            .get('/users/theUsername')
            .end(function(err, res){
                assert(res.status === 200, "status should be 200");
                assert(res.body.username === "theUsername", 'username should be theUsername');
                // res.should.be.json;
                // res.body.should.be.a('array');
                done();
            });
    });
    it('should get the user theUsername users on /users GET', function(done) {
        chai.request(app)
            .get('/users/Bichonche')
            .end(function(err, res){
                assert(res.status === 200, 'should be status 200');
                assert(res.body.username === "Bichonche", "username should be Bichonche");
                done();
            });
    });
});