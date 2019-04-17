const express = require('express');
var jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

const mongoose = require('mongoose');
const db = 'mongodb+srv://root:root@cluster0-0m5fr.mongodb.net/ophigousersdb?retryWrites=true';

const TOKEN_KEY = 'secretKey';

mongoose.connect(db, {useNewUrlParser: true}, (err) => {
    if (err) {
        console.error('Error! ' + err);
    } else {
        console.log('Connected to mongodb');
    }
});

router.get('/', (req, res) => {
    res.send('From API Route');
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unathorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null' || token === ''.trim() ) {
        return res.status(401).send('Unathorized request');
    }

    try {
        let payload = jwt.verify(token, TOKEN_KEY);

        if(!payload){
            return res.status(401).send('Unathorized request');
        }
        req.userId = payload.subject;
        next();
    } catch(err) {
        if(err.name === 'TokenExpiredError'){
            return res.status(401).send('Token is expired');
        } else {
            return res.status(401).send('Unathorized request');
        }
    }
}

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser) => {
        if (err) {
            console.error('Error! ' + err);
        } else {
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, TOKEN_KEY, {expiresIn: '7d'});
            res.status(200).send({token});
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.error('Error! ' + error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email');
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password');
                } else {
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, TOKEN_KEY, {expiresIn: '7d'});
                    res.status(200).send({token, 'name': user.name});
                }
            }
        }
    })
});

router.get('/getAll', verifyToken, (req, res) => {
    User.find().lean().exec(function (err, users) {
        return res.end(JSON.stringify(users));
    });
});

module.exports = router;