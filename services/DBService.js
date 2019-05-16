/** System require */
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

/** */ 
exports.write = function (inputCollection, obj) {
    return new Promise(function (resolve, reject) {
        var dbCluster = process.env.DB_CLUSTER;
        var dbUser = process.env.DB_USER;
        var dbPassword = process.env.DB_PASSWORD;
        var dbName = process.env.DB_NAME;

        // DB connection 
        var dbUrl = "mongodb+srv://" + dbUser + ":" + dbPassword + "@" + dbCluster + "/" + dbUser;

        MongoClient.connect(dbUrl, function (err, client) {
            if (err) {
                console.log("Something goes wrong during the db connection");
                reject();
            } else {
                console.log("Connection to db successfully created");
                dbClient = client;

                var db = dbClient.db(dbName);
                var collection = db.collection(inputCollection);

                // 
                collection.insert(obj, function (err, result) {
                    if (err) {
                        // An error happened when trying to insert an object inside the database 
                        console.log("Something goes wrong during the break item insert inside the db");
                        console.log(JSON.stringify(err));
                        reject();
                    } else {
                        // The insert of the object inside the db is ok
                        if (result.result.ok) {
                            console.log("The break item " + result.ops[0].id + "successfully insert ");
                            resolve();
                        } else {
                            console.log("The break item " + result.ops[0].id + "has trouble during insert ");
                            console.log(JSON.stringify(result));
                            reject();
                        }
                    }
                })
                resolve();
            }
        })
    })
}