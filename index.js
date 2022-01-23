const express = require('express');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;

// Url to the MongoDB database:
const db_url = 'mongodb://localhost:27017'

// Express stuff:
const app = express();
app.use(morgan('dev'));

// Returns in JSON 
app.route('/api/people')
    .get((req, res) => {
        MongoClient.connect(db_url, (err, db) => {
            let dbo = db.db('crud');
            dbo.collection('api_keys').findOne({api_key: req.query.apikey}, (err, result) => {
                if (result == null) {
                    res.send({message: 'not authorized'})
                } else {
                    dbo.collection('people').find({}).toArray((err, results) => {
                        res.send(results);
                    })
                }
            })
        })
    })

    // Adds an entry to the 'people' collection. TODO polish this up
    .post((req, res) => {

        let person = {
            name: req.query.name,
            address: req.query.address
        };

        MongoClient.connect(db_url, (err, db) => {
            if (err) throw err;

            let dbo = db.db('crud');

            dbo.collection('people').findOne({ name: req.query.name }, (err, result) => {
                if (err) throw err;
                if (result != null) {
                    res.send({
                        "insertSuccess": false,
                        "message": `${req.query.name} already exists in the collection`
                    })
                    db.close();
                } else {
                    dbo.collection('people').insertOne({
                        name: req.query.name,
                        address: req.query.address
                    }, (err, res) => {
                        db.close();
                    });
                    
                    res.send({
                        "insertSuccess": true,
                        "message": `Inserted ${req.query.name}`
                    })
                    
                }
                
            });
        })
    });

app.listen(3000, (err) => {
    console.log('Listening on port 3000');
})