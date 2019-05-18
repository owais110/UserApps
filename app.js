'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require("./models/user");

const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/demo', {useNewUrlParser: true});

app.use(bodyParser.json({ limit: 100000 }));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/user/:id', function (req, res) {
   console.log("Got a GET request for the homepage",req.header);
   
   User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    });
 
})


app.put('/user/:id/update', function (req, res) {
   User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
 
})

app.delete('/user/:id/delete', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
})
// This responds a POST request for the homepage
app.post('/user', function (req, res) {
   console.log("Got a POST request for the homepage",req.body);
   
	
	let user = new User({
	first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        username: req.body.username,
        password:req.body.password
	});

   user.save()
   .then((data)=>{
   	res.json(data);
   })
   .catch((err)=>{
   	res.send("error "+ err);
   })
})

const server = app.listen(8081, function () {
   const host = server.address().address
   const port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});