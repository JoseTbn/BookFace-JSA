// lib and imports
// Connect MongoDB: mongodb+srv://Steven:<password>@cluster0.jsc3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongoose = require('mongoose');
const express = require("express");
const app = express();
const Thing = require("./models/thing");
const bodyParser = require('body-parser');


mongoose.connect('mongodb+srv://StevenEsteban:mKW-u98-GWEgxGm@cluster0.6toon.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Failed to connect!');
        console.error(error);
    });

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());


// pages
app.get('/', (req, res) => {
    // callback
    res.render('home.ejs');
});

app.get('/thehall',(req, res) => {
  res.render('thehall.ejs');
});
app.get('/floors',(req, res) => {
  res.render('floors.ejs');
});










app.post('/api/something', (req, res, next) => {
    const thing = new Thing({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    });
    thing.save().then(
        () => {
            res.status(201).json({
                message: 'New thing saved, gg'
            })
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.get('/api/something/:id', (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.put('/api/something/:id', (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl

    });
    Thing.updateOne({ _id: req.params.id }, thing).then(
        () => {
            res.status(201).json({
                message: 'Thing updated'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.use('/api/something', (req, res, next) => {
    Thing.find().then(
        (things) => {
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    )
})

app.listen(3000, () => console.log("Server UP"));
// app.listen(process.env.PORT || 3000, () => console.log("Server Up and running"));