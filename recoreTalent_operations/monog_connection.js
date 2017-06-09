var client = require('mongodb').MongoClient;
var assert = require('assert')
module.exports = function (callback){
    var url = "mongodb://localhost:27017/recoreTalent";
    client.connect(url, function(err, db){
        callback(err, db);
    });
}