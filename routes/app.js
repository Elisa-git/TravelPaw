//db = project_db
var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
    res.render('index');
});
router.get('/message', function (req, res, next) {
    if(req.params.msgParam != ''){
        res.render('node');
    }    
});
router.post('/message', function (req, res, next) {
    var  messageVar = req.body.messageBody;
    res.redirect('/message/' + messageVar);
});
router.get('/message/:msgParam', function (req, res, next) {
    res.render('node', {message: req.params.msgParam});
});

router.get('/node-mongodb-mongoose-user', function (req, res, next){
    User.findOne({}, {}, { sort: {  _id: -1 } }, function(err, documents){
        if(err){
            return res.send('Error!! :-(');
        }
        res.render('node', {
            firstNameV: documents.firstName,
            lastNameV: documents.lastName,
            passwordV: documents.password,
            emailV: documents.email,
            messagesV: documents.message
        });
    });    
});

router.post('/node-mongodb-mongoose-user', function (req, res, next) {
    var emailVar = req.body.email;
    var firstnameVar = req.body.firstname;
    var lastnameVar = req.body.lastname;
    var passwordVar = req.body.password;
    var userObject = new User({
        firstName: firstnameVar,
        lastName: lastnameVar,
        password: passwordVar,
        email: emailVar
    });
    userObject.save();
    res.redirect('/node-mongodb-mongoose-user');
});


module.exports = router;
